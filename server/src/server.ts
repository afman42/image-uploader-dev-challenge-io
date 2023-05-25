import Fastify, { FastifyReply, FastifyRequest }   from "fastify";
import path from "node:path"
import multer  from 'fastify-multer'
import { prisma } from "./utils";
import { File } from "fastify-multer/lib/interfaces";
import cors from '@fastify/cors'
import { format } from "date-fns";
import indoLocale from "date-fns/locale/id"

function fileName(file: File){
  const formattedDate = format(Date.now(), 'dd-MM-YYY-hh:mm', {
    locale: indoLocale
  });
  return file.fieldname + '-' + formattedDate + "." + file.mimetype.split("/")[1]
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../public'))
    },
    filename: function (req, file, cb) {
      cb(null, fileName(file))
    }
})

function buildServer() {
  const server = Fastify();
  const upload = multer({ storage })

  server.register(require('@fastify/static'), {
    root: path.join(__dirname, '../public'),
    prefix: '/public/',
  })

  server.register(cors,{ origin: true })

  server.register(multer.contentParser)
  
  server.route({
    method: "POST",
    url: "/upload",
    schema: {
      response: {
        "200": {
          type: "object",
          properties: {
            id: { type: "number" },
            name: { type: "string" }
          }
        },
        "500": {
          type: "object",
          properties: {
            data: { type: "string" }
          }
        }
      }
    },
    preHandler: upload.single("name"),
    handler: async function(request: FastifyRequest, reply: FastifyReply){
        try {
          const file = (request as any).file as File
          const res = await prisma.photos.create({
              data: {
                  name: fileName(file)
              }
          })

          reply.code(200).send(res) 
        } catch (error) {
          reply.code(500).send({ data: "Something Went Wrong"})
          console.log(error)
        }
    }
  })

  server.route({
    method: "GET",
    url: "/view/:id",
    schema: {
      response: {
        "200": {
          type: "object",
          properties: {
            id: { type: 'number' },
            name: { type: 'string' }
          }
        },
        "404": {
          type: "object",
          properties: {
            data: { type: "string" }
          }
        }
      }
    },
    handler: async function(request: FastifyRequest, reply: FastifyReply){
        const paramID = (request.params as any).id as string
        const res = await prisma.photos.findFirst({
          where: { id: parseInt(paramID) }
        })

        if(!res) reply.code(404).send({ data: "Not Found" })

        const resObject = {
          ...res,
          name: "/public/" + res?.name
        }
        reply.code(200).send(resObject)
    }
  })

  return server;
}

export default buildServer;