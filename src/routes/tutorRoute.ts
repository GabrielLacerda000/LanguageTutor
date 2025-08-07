import { Elysia, t } from 'elysia';
import { tutorPrompt } from '../services/tutorService';


export const tutorRoute = (app: Elysia) =>
  app.post(
    '/tutor',
    async ({ body }) => {
      const { message } = body;

      try {
        const result = await tutorPrompt(message);
        return { result };
      } catch (error) {
        console.error(error);
        return { error: 'Erro ao chamar o tutor' };
      }
    },
    {
      body: t.Object({
        message: t.String(),
        language: t.String()
      })
    }
  );
