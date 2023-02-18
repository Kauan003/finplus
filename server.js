require('dotenv').config()
const express = require('express');
const bodyParser = require("body-parser")
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const app = express();
app.use(express.static('public'));
app.use(express.json())

const urlencodedParser = bodyParser.urlencoded({extended:false})

//MODELS
const User = require('./Models/User')

//ROTA GERalnp
app.get('/', function(req, res) {
  res.status(200).json({msg:'ola'});
}); 

//ROTA PRIVADArm -r .git
app.get('/user/:id', checkToken, async (req,res)=>{

  const id = req.params.id

  const user = await User.findById(id,'-password')

  if(!user){
    return res.status(404).json({msg:'Usário não encontrado!'})
  }

  res.status(200).json({user})

})

function checkToken(req,res,next){
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(" ")[1]

  if(!token){
    return res.status(400).json({msg: "Acesso negado!"})
  }

  try{

    const secret = process.env.SECRET

    jwt.verify(token, secret)
    next()


  } catch(error){
    res.status(400).json({msg:"Token inválido!"})
  }

}


//REGISTER USER
app.post('/auth/register', urlencodedParser, async (req,res)=>{

  const {name,email, password, confirmpassword} = req.body

  if(!name){
    return res.status(422).json({msg: 'nome é obrigatorio para cadastro'})
  }
  if(!email){
    return res.status(422).json({msg: 'email é obrigatorio para cadastro'})
  }
  if(!password){
    return res.status(422).json({msg: 'senha é obrigatorio para cadastro'})
  }
  if(password !== confirmpassword){
    return res.status(422).json({msg: 'as senhas nao conferem'})
  }

  //check if user exists-
  const userExists = await User.findOne({email:email})

  if(userExists){
    return res.status(422).json({msg:'email ja cadastrado'})
  }
  
  //create password
  const salt = await bcrypt.genSalt(12)
  const passwordHash = await bcrypt.hash(password, salt)

  //create user

  const user  = new User({
    name,
    email,
    password:passwordHash,
  })

  try{

    await user.save()

    res.status(201).json('usuario cadastrado com sucesso')


  } catch(error){
    console.log(error)

    res.status(500).json('Erro no servidor, tente novamente mais tarde')
  }
})

//LOGIN USER
app.post('/auth/login', urlencodedParser, async (req, res)=>{
  const {email, password} = req.body

  //validations
  if(!email){
    return res.status(422).json({msg: 'email é obrigatorio'})
  }
  if(!password){
    return res.status(422).json({msg: 'senha é obrigatorio'})
  }

  //check if user exists
  const user = await User.findOne({email:email})

  if(!user){
    return res.status(404).json({msg:'usario não encontrado'})
  }

  //check if password match

  const checkPassword = await bcrypt.compare(password, user.password)

  if(!checkPassword){
    return res.status(422).json({msg:'Senha inválida!'})
  }

  try{

    const secret = process.env.SECRET

    const token = jwt.sign(
      {
        id:user._id,
      }, secret,
    )

    res.status(201).json({msg:"Autenticado com sucesso!", token})
    if(token && checkPassword){
     
    }
  } catch(error){
    console.log(error)

    res.status(500).json('Erro no servidor, tente novamente mais tarde')
  }
})


  
//CONECTANDO AO BANCO DE DADOS

const dbUSER = process.env.DB_USER
const dbPass = process.env.DB_PASS

mongoose.set("strictQuery", true);
mongoose
.connect(`mongodb+srv://${dbUSER}:${dbPass}@cluster0.zklrhfu.mongodb.net/?retryWrites=true&w=majority`)
.then(() => {app.listen(3000, function () {
  console.log('conectou ao banco de dados');
});})
.catch((err) => console.log(err))
