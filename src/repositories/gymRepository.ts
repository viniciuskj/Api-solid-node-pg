import { Gym } from 'generated/prisma/client'

export interface GymRepository {
  findById(id: string): Promise<Gym | null>
}
