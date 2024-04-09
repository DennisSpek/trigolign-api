import { User } from '@/database/entities/user.entity';

export const SessionClass = (m: any) => {
  return{
    async createSession(userId: string, userAgent: string){
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 30);

      const session = await m.save("Session", {user_id: userId, user_agent: userAgent, expires_at: expirationDate});

      return session.id;
    },
    async getSession(id: string){
      const session = await m.findOne("Session", { where: { id } });

      return session;
    },

    async getUserBySessionId(sessionId: string){
      const session = await m.findOne("Session", {relations: ['user_id'], where: { id: sessionId }});

      if(session){
        const user = await m.findOne(User, { relations: ['branch'], where: { id: session.user_id.id }});

        return user;
      }

      return null
    },
  }
}