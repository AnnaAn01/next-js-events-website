// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  const { method } = req;
  if (method === "POST") {
    const { email, eventId } = req.body;
    res.status(200).json({
      message: `You have been registered successfully wth the email: ${email} ${eventId}`,
    });
  }
}
