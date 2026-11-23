const { z } = require("zod");

const registerSchema = z.object({
    full_name: z.string().trim().min(2).max(100),
    email: z.email().trim().toLowerCase(),
    password: z.string().min(8).max(72)
})
module.exports = registerSchema