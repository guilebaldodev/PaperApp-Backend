import { testConnection } from "./app.js"
import app from "./app.js"

testConnection()

app.listen(3000,()=>console.log("Servidor on port 3000"))
