import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Student from 'App/Models/Student'
import { v4 as uuidv4 } from 'uuid'
export default class StudentsController {
  public async index() {
    const students = await Student.all()
    return students
  }

  public async store({ request, response }: HttpContextContract) {
    const body = request.body()
    const body_student = { ...body, registration: uuidv4() }
    const student = await Student.create(body_student)
    response.status(201)
    return {
      message: 'Student was created',
      data: student,
    }
  }

  public async show({ request }: HttpContextContract) {
    const id = request.param('id')
    const student = await Student.findOrFail(id)
    return student
  }

  public async destroy({ request }: HttpContextContract) {
    const id = request.param('id')
    const student = await Student.findOrFail(id)
    student.delete()
  }

  public async update({ request, response }: HttpContextContract) {
    const body = request.body()
    const id = request.param('id')
    const student = await Student.findOrFail(id)
    student.name = body.name
    student.email = body.email
    student.birthdate = body.birthdate
    student.save()
    
  }
}
