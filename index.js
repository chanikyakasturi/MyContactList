const Myexpress=require('express');
const path=require('path');
const port=7000;
const db=require('./Config/mongoose');
const Contact=require('./Model/Contact')
const app=Myexpress();
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'ContactList'));
app.use(Myexpress.urlencoded());
app.use(Myexpress.static('Assets'))

// our own middle ware 
// app.use((req,res,next)=>{
//   req.name="chanikya";
//   console.log("This is first own middle ware 1");
//   next();
// })

var ContactList=[
  {
    name:"chanikya",
    phone:"9398623213"
  },
  {
    name:"vineela",
    phone:"8897762256"
  }
]
                    /*This renders login page,when we use '/login' */
app.get('/login', (req, res)=>{
  // console.log(__dirname);
  let title="login";
    res.sendFile(__dirname+'/login.html');
  });
          /*This renders EJS file page,when we use '/user1' */
app.get('/user1', (req, res)=>{
  let user1={
    firstName: "Rajesh",
    lastName: "Gotttimukkula",
    country: "India",
    state: "Telangana",
    city: "Hyderabad",
    contactlist:{
      chandu:9398623213,
      gopal:9949205684,
      rajesh:88897752256,
    },
  }
  const UserName="Rajesh";
  const title=`This is ${UserName}'s title`
return res.render('User1',{arr:user1,title:title,name:UserName})
  });
          /*This renders EJS file page,when we use '/user2' */
  app.get('/user2',(req,res)=>{
      let user2={
        firstName: "Chanikya",
        lastName: "Kasturi",
        country: "India",
        state: "Andhra Pradesh",
        city: "Kurnool",
        contactlist:{
          chandu:9398623213,
          gopal:9949205684,
          rajesh:88897752256,
        },
      }
      const UserName="Chanikya";
      const title=`This is ${UserName}'s title`
    return res.render('User2',{arr:user2,title:title,name:UserName})
  })
          /*This renders EJS file page,when we use '/user3' */
  app.get('/user3',(req,res)=>{
    let user3={
      firstName: "Vineela",
      lastName: "Kasturi",
      country: "India",
      state: "Andhra Pradesh",
      city: "Kurnool",
      contactlist:{
        chandu:9398623213,
        lalithamma:8897762256,
        visweswarlu:9394166809 
         },
    }
    const UserName="Vineela";
    const title=`This is ${UserName}'s title`
  return res.render('User2',{arr:user3,title:title,name:UserName})
})
          /*This renders EJS file page,when we use '/user4' */
app.get('/user4',(req,res)=>{
  let user4={
    firstName: "lalithamma",
    lastName: "Kasturi",
    country: "India",
    state: "Andhra Pradesh",
    city: "Kurnool",
    contactlist:{
      chandu:9398623213,
      visweswarlu:9394166809,
      vineela:714789785981,
    },
  }
  const UserName="Lalithamma";
  const title=`This is ${UserName}'s title`
return res.render('User2',{arr:user4,title:title,name:UserName})
})
// app.get('/contact',(req,res)=>{
//   // iterate over db Contact 
//   Contact.find({},(error,contact)=>{
//     if(error){
//       console.log("There is a error in fetching data",error);
//       return;
//     }
//     let title="contact_list";
//    return res.render('demo',{title:title,contact_list:contact})
//   })
// })

app.get('/', (req, res) => {
  // try {
  //   const contacts = await Contact.find({});
  //   let title = "contact_list";
  //   console.log("successfully displays in view folder",contacts);
  //   return res.render('demo', { title: title, contact_list: contacts });
  // } catch (error) {
  //   console.log("There is an error in fetching data", error);
  //   return res.status(500).json({ error: "There is an error in fetching data" });
  // }

  Contact.find({}).then((contact)=>{
    // console.log("successfully displays in view folder",contact);
    let title="contact_list";
    return res.render('demo',{title:title,contact_list:contact});
  }).catch((error)=>{
    console.log("There is an error in fetching data",error);
     return res.status(500).json({error:"there is an errror in fetching data"});
  })
});

// app.post('/create-contact',function(req,res){

//   // ContactList.push(req.body);
//     Contact.create({
//       name:req.body.name,
//       phone:req.body.phone,
//    },function(err,MyContact){
//     if(err){
//       console.log('there is a error is contact',err)
//       return;
//     }
//     console.log('contact create successfully',MyContact);
//     return res.redirect('back')
//    });
// });

          /*from chatgpt using async and await
          app.post('/create-contact', async function(req, res) {
            try {
              const newContact = await Contact.create({
                name: req.body.name,
                phone: req.body.phone
              });
              console.log('Contact created:', newContact);
              return res.redirect('back');
            } catch (error) {
             console.error('Error creating contact:', error);
              return res.status(500).json({ error: 'Failed to create contact' });
            }
          });   
          */
    /**using .then and catch */
 app.post('/create-contact',(req,res)=>{
  Contact.create(req.body).then((newContact)=>{
           console.log("saved in data base successfully",newContact)
                    return res.redirect('back');
            }).catch((error)=>{
            console.log("there is error in saving into data base",error);
        return res.status(500).json({error:"there is error in saving into data base"});
            })
    });   
app.get('/delete-contact/',(req,res)=>{
  console.log("this is query");
  console.log(req.query);
  let id=req.query.id;
  // let contact_index=Contact.findIndex(obj=>obj.id==id);
  Contact.findByIdAndDelete(id).then((success)=>{
    console.log("contact delted successfully");
    return res.redirect('back');
  }).catch((error)=>{
    console.log("There is an error in deleting contact",error);
    return;
  })
})

app.listen(port,function(err){
    if(err){
        console.log("Opp's something went wrong",err);
    }
    console.log("Hey,there my first expresss is running on port",port);
})