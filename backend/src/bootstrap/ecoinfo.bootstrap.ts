import Ecoinfo from '../models/ecoinfo.model'
import { Bootstrapper } from './Bootstraper'

export default class EcoinfoBootstrap extends Bootstrapper {
  async run() {
    Ecoinfo.bulkCreate([
      {
        ecoinfoId: '550e8400-e29b-41d4-a716-446655440000',
        postId: 'post-1234-efgh-0000',
        postLink: 'https://www.facebook.com/iniciativaclima',
        coverImage:
          'https://scontent.fqro3-1.fna.fbcdn.net/v/t39.30808-6/376771300_611797287819531_4257456994451162629_n.jpg?stp=dst-jpg_p526x296&_nc_cat=105&ccb=1-7&_nc_sid=49d041&_nc_ohc=0OoK51wnisMAX-0D3qC&_nc_ht=scontent.fqro3-1.fna&oh=00_AfApT-esdgCtgQg0Tnl32UlaYjEHayLf34FFCW4yYkKBuw&oe=6508418E',
        description:
          '59% de los municipios de México sean sumamente vulnerables al cambio climático. Ruta Emisiones Netas Cero una propuesta que busca guiar las acciones de México y alcanzar el “cero neto” en 2050.',
      },
      {
        ecoinfoId: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
        postId: 'post-1234-efgh-0001',
        postLink: 'https://www.facebook.com/iniciativaclima',
        coverImage:
          'https://scontent.fqro3-1.fna.fbcdn.net/v/t39.30808-6/374185778_611334311199162_4727800625878814970_n.jpg?stp=dst-jpg_p526x296&_nc_cat=103&ccb=1-7&_nc_sid=49d041&_nc_ohc=DmbPf8Oy_WIAX-jpZuB&_nc_ht=scontent.fqro3-1.fna&oh=00_AfDHtei4DrdLWJFjv2fZu-ksjhFv6Vzyw1Gdd8L3yYDmmw&oe=65082D44',
        description:
          '!!AUMENTA pobreza energética en la República mexicana; 45 mil localidades carecen de energía. ☀️',
      },
      {
        ecoinfoId: 'a1b2c3d4-e5f6-7890-a1b2-3456789cdef0',
        postId: 'post-1234-efgh-0002',
        postLink: 'https://www.facebook.com/iniciativaclima',
        coverImage:
          'https://scontent.fqro3-1.fna.fbcdn.net/v/t39.30808-6/375211516_608590191473574_5948856669388154492_n.jpg?stp=dst-jpg_p526x296&_nc_cat=100&ccb=1-7&_nc_sid=49d041&_nc_ohc=JSCYtjH6mPcAX-fQRnM&_nc_ht=scontent.fqro3-1.fna&oh=00_AfB-Yo4IzBF0D2XrOyCx73vcZw1UTO759MGvgsG3UcDr9Q&oe=6506DD8D',
        description:
          'La arquitectura regenerativa representa la posibilidad de repensar los espacios comunes y comprender que los territorios, son sistemas que incluyen lo geológico, orográfico, hidrológico, biológico y, también, lo comunitario y cultural. ',
      },
      {
        ecoinfoId: '9e10f11a-12b3-45c6-d7e8-9f0123456789',
        postId: 'post-1234-efgh-0003',
        postLink: 'https://www.facebook.com/iniciativaclima',
        coverImage:
          'https://scontent.fqro3-1.fna.fbcdn.net/v/t39.30808-6/371783251_605430471789546_4338049499711587015_n.jpg?stp=dst-jpg_p526x296&_nc_cat=111&ccb=1-7&_nc_sid=49d041&_nc_ohc=ds2rJntUgn0AX-im5G5&_nc_ht=scontent.fqro3-1.fna&oh=00_AfC1YNaqUMt7J2lRpXEpPy3ALGMhxamhD0TZ5afvLZI5sA&oe=6508200A',
        description:
          'Es posible establecer procesos regenerativos incluso en las peores condiciones.',
      },
    ])
  }
}
