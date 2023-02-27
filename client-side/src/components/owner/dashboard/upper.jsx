import { Card, Grid, Row, Text } from "@nextui-org/react";
import HomeIcon from '@mui/icons-material/Home';
import { Typography } from "@mui/material";

export default function Upper() {
  const list = [
    {
      title: "Users",
      img: "http://icons.iconarchive.com/icons/custom-icon-design/flatastic-4/512/Users-icon.png",
      price: "112",
    },
    {
      title: "Quiz Categories",
      img: "https://cdn0.iconfinder.com/data/icons/infographic-orchid-vol-1/256/Colorful_Label-512.png",
      price: "12",
    },
    {
      title: "Quizzes",
      img: "https://www.vippng.com/png/full/2-20285_free-icons-png-computer-icon-flat-design.png",
      price: "31",
    },
    {
      title: "Subjects",
      img: "https://www.pngall.com/wp-content/uploads/2018/05/Books-Free-PNG-Image.png",
      price: "25",
    },
    {
      title: "Topics",
      img: "https://cdn-icons-png.flaticon.com/512/201/201594.png",
      price: "22",
    },
    {
      title: "Question",
      img: "https://sweetclipart.com/multisite/sweetclipart/files/question_button.png",
      price: "160",
    },
    {
      title: "Suscribed Users",
      img: "https://www.pinclipart.com/picdir/big/221-2217551_computer-user-clip-art.png",
      price: "7",
    },
    {
      title: "Theams",
      img: "https://cdn0.iconfinder.com/data/icons/mii-ui-vol-3/133/themes-512.png",
      price: "2",
    },
  ];

  return (
    
    <Card>
      <div  style={{display:"flex"}}><HomeIcon sx={{height:"30px",width:"30px"}}/>
    <Typography variant='h6'>Dashboard</Typography></div>

    <Grid.Container gap={1} justify="flex-start">
       
      {list.map((item, index) => (
       
        <Grid xs={6} sm={3} key={index}>
          <Card
            isPressable
            isHoverable
            variant="bordered"
            css={{ mw: "500px" }}
          >
            <Card.Image
              src={item.img}
              objectFit="cover"
              width={95}
              height={100}
              alt={item.title}
              
            />
            <Text h2 b>
              {item.price}
            </Text>
            <Text h5 css={{ color: "$accents7", fontWeight: "$semibold" }}>
              {item.title}
            </Text>
          </Card>
        </Grid>
       
      ))}
      
    </Grid.Container>
    </Card>
  );
}
