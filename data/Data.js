express = require("express"),
bodyParser = require("body-parser")

const app = express();;
const port = 4000;


//In-memory data store 
let parking = [
    {
        id: 1,
        parking_number: 1,
        address: "Railway Station Area, Varachha, Surat, Gujarat 395008",
        security_star: "⭐⭐⭐⭐",
        total_spot: 100,
        available: 23,
        occupied: 77,
        type: "🏍️🚗🚕🚚",
        link: "https://www.google.com/maps/place/Surat+Railway+Pay+And+Park/@21.206114,72.840136,17z/data=!4m6!3m5!1s0x3be04f3906ad8a0b:0x411a84a017a6c633!8m2!3d21.2061144!4d72.8401357!16s%2Fg%2F11ghpmwf1y?hl=en&entry=ttu",
        src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2211.7215312245835!2d72.83796322917658!3d21.205764040509283!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04f3906ad8a0b%3A0x411a84a017a6c633!2sSurat%20Railway%20Pay%20And%20Park!5e0!3m2!1sen!2sin!4v1697250511342!5m2!1sen!2sin"
    },
    {
      id: 1,
      parking_number: 1,
      address: "Railway Station Area, Varachha, Surat, Gujarat 395008",
      security_star: "⭐⭐⭐⭐",
      total_spot: 100,
      available: 23,
      occupied: 77,
      type: "🏍️🚗🚕🚚",
      link: "https://www.google.com/maps/place/Surat+Railway+Pay+And+Park/@21.206114,72.840136,17z/data=!4m6!3m5!1s0x3be04f3906ad8a0b:0x411a84a017a6c633!8m2!3d21.2061144!4d72.8401357!16s%2Fg%2F11ghpmwf1y?hl=en&entry=ttu",
      src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2211.7215312245835!2d72.83796322917658!3d21.205764040509283!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04f3906ad8a0b%3A0x411a84a017a6c633!2sSurat%20Railway%20Pay%20And%20Park!5e0!3m2!1sen!2sin!4v1697250511342!5m2!1sen!2sin"
  },
  {
    id: 1,
    parking_number: 1,
    address: "Railway Station Area, Varachha, Surat, Gujarat 395008",
    security_star: "⭐⭐⭐⭐",
    total_spot: 100,
    available: 23,
    occupied: 77,
    type: "🏍️🚗🚕🚚",
    link: "https://www.google.com/maps/place/Surat+Railway+Pay+And+Park/@21.206114,72.840136,17z/data=!4m6!3m5!1s0x3be04f3906ad8a0b:0x411a84a017a6c633!8m2!3d21.2061144!4d72.8401357!16s%2Fg%2F11ghpmwf1y?hl=en&entry=ttu",
    src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2211.7215312245835!2d72.83796322917658!3d21.205764040509283!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04f3906ad8a0b%3A0x411a84a017a6c633!2sSurat%20Railway%20Pay%20And%20Park!5e0!3m2!1sen!2sin!4v1697250511342!5m2!1sen!2sin"
}
]
let lastId = 2;
//Middleware

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// GET all parking
app.get("/parking", (req, res) => {
    console.log(parking);
    res.json(parking);
  });
  
  // GET a specific post by id
//   app.get("/parking/:id", (req, res) => {
//     const post = parking.find((p) => p.id === parseInt(req.params.id));
//     if (!post) return res.status(404).json({ message: "Parking not found" });
//     res.json(parking);
//   });
  
//   // POST a new parking
//   app.post("/parking", (req, res) => {
//     const newId = lastId += 1;
//     const parking = {
//       id: newId,
//       title: req.body.title,
//       content: req.body.content,
//       author: req.body.author,
//       date: new Date(),
//     };
//     lastId = newId;
//     posts.push(parking);
//     res.status(201).json(parking);
//   });
  
  // PATCH a post when you just want to update one parameter
//   app.patch("/parking/:id", (req, res) => {
//     const parking = parking.find((p) => p.id === parseInt(req.params.id));
//     if (!post) return res.status(404).json({ message: "parking not found" });
  
//     if (req.body.title) post.title = req.body.title;
//     if (req.body.content) post.content = req.body.content;
//     if (req.body.author) post.author = req.body.author;
  
//     res.json(post);
//   });
  
  // DELETE a specific post by providing the post id
  app.delete("/parking/:id", (req, res) => {
    const index = parking.findIndex((p) => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: "parking not found" });
  
    parking.splice(index, 1);
    res.json({ message: "parking deleted" });
  });
  
  app.listen(port, () => {
    console.log(`API is running at http://localhost:${port}`);
  });
  