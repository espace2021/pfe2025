const express=require('express')
const mongoose=require('mongoose')
const app=express()
const CategorieRouter=require("./routes/categorie.route")
const scategorieRouter = require("./routes/scategorie.route")
const MarqueRouter = require("./routes/marque.route")
const ProduitRouter = require("./routes/produit.route")
const userRouter =require("./routes/user.route")
const dotenv=require("dotenv")
const cors=require("cors")
app.use(express.json())
app.use(cors())
dotenv.config()
const path = require('path'); // Ajout de l'importation de path

//dist reactjs
app.use(express.static(path.join(__dirname, './client/build'))); // Route pour les pages non trouvées, redirige vers index.html 
app.get('*', (req, res) => { res.sendFile(path.join(__dirname, './client/build/index.html')); });

//connection base de donnée
mongoose.connect("mongodb+srv://hsan:hsan@cluster0.9pyz2.mongodb.net/dbcommerce")
.then(()=>{console.log("connection a la base de données reussie")})
.catch((Error)=>{console.log("impossible de se connecter al la base de données",Error)
    process.exit()
})
app.use("/api/categories",CategorieRouter)
app.use('/api/scategories', scategorieRouter)
app.use("/api/marques",MarqueRouter)
app.use("/api/produits", ProduitRouter)
app.use('/api/users', userRouter);
PORT=2000
app.listen(PORT,function(){
    console.log("serveur is listen on port 2000")
})
module.exports=app;