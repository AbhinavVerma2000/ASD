import React, { useState, useEffect, useRef } from "react";
import TextField from "@mui/material/TextField";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import Box from "@mui/material/Box";
import {
  createTheme,
  ThemeProvider,
  Theme,
  useTheme,
} from "@mui/material/styles";
import { Button } from "@mui/material";




const customTheme = (outerTheme: Theme) =>
  createTheme({
    palette: {
      mode: outerTheme.palette.mode,
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "--TextField-brandBorderColor": "#E0E3E7",
            "--TextField-brandBorderHoverColor": "#B2BAC2",
            "--TextField-brandBorderFocusedColor": "#6F7E8C",
            "& label.Mui-focused": {
              color: "var(--TextField-brandBorderFocusedColor)",
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: "var(--TextField-brandBorderColor)",
          },
          root: {
            [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: "var(--TextField-brandBorderHoverColor)",
            },
            [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: "var(--TextField-brandBorderFocusedColor)",
            },
          },
        },
      },
      MuiFilledInput: {
        styleOverrides: {
          root: {
            "&::before, &::after": {
              borderBottom: "2px solid var(--TextField-brandBorderColor)",
            },
            "&:hover:not(.Mui-disabled, .Mui-error):before": {
              borderBottom: "2px solid var(--TextField-brandBorderHoverColor)",
            },
            "&.Mui-focused:after": {
              borderBottom:
                "2px solid var(--TextField-brandBorderFocusedColor)",
            },
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          root: {
            "&::before": {
              borderBottom: "2px solid var(--TextField-brandBorderColor)",
            },
            "&:hover:not(.Mui-disabled, .Mui-error):before": {
              borderBottom: "2px solid var(--TextField-brandBorderHoverColor)",
            },
            "&.Mui-focused:after": {
              borderBottom:
                "2px solid var(--TextField-brandBorderFocusedColor)",
            },
          },
        },
      },
    },
  });
// Function to generate a random user ID
const generateUserId = () => {
  return "USER" + Math.floor(Math.random() * 10000);
};

const Userdata = () => {
  // Initial state for form fields and user ID
  const outerTheme = useTheme();

  const ref = useRef<HTMLDivElement>(null);
  
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(true); // To track if changes are saved
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);
  const [list, setList] = useState(false);

  // Load data from local storage when the component mounts
  useEffect(() => {
    const storedData = localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData") as string)
      : null;
    if (storedData) {
      setName(storedData.name);
      setAddress(storedData.address);
      setEmail(storedData.email);
      setPhone(storedData.phone);
      setUserId(storedData.userId);
    }
    const storedEditor = localStorage.getItem("editor")
      ? JSON.parse(localStorage.getItem("editor") as string)
      : null;
    if (storedEditor) {
      setBold(storedEditor.bold);
      setItalic(storedEditor.italic);
      setUnderline(storedEditor.underline);
      setList(storedEditor.list);
    }
  }, []);

  // Save form data to localStorage
  const saveData = () => {
    const userData = {
      name,
      address,
      email,
      phone,
      userId: userId || generateUserId(),
    };
    const editor = {
      bold,
      italic,
      underline,
      list,
    };
    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem("editor", JSON.stringify(editor));
    setUserId(userData.userId); // Set user ID after saving
    setIsSaved(true); // Mark as saved
  };





  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    saveData();
  };

  // Warn the user about unsaved changes when they try to leave
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!isSaved) {
        const message =
          "You have unsaved changes. Do you really want to leave?";
        return message; // For others
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isSaved]);

  

  const userData = localStorage.getItem("userData");
  const editor = localStorage.getItem("editor");


  return (
    <div>
      <h3>User Data Form</h3>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { sm: "column" },
            gap: 2,
            width: "50%",
          }}
        >
          <ThemeProvider theme={customTheme(outerTheme)}>
            <TextField
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setName(event.target.value)
              }
              value={name}
              label="Name"
            />
            <TextField
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setAddress(event.target.value)
              }
              value={address}
              label="Address"
            />
            <TextField
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(event.target.value)
              }
              value={email}
              label="Email"
            />
            <TextField
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setPhone(event.target.value)
              }
              value={phone}
              label="Phone"
            />
          </ThemeProvider>
          <Button size="large" type="submit" variant="contained">
            Save
          </Button>
        </Box>
      </form>

      <div><Button onClick={()=>{bold===true?setBold(false):setBold(true)}}>B</Button><Button onClick={()=>{italic===true?setItalic(false):setItalic(true)}}>I</Button><Button onClick={()=>{underline===true?setUnderline(false):setUnderline(true)}}>U</Button><Button onClick={()=>setList(!list)}>List</Button></div>
      <div ref={ref} className={`${bold ? 'bold' : ''} ${italic ? 'italic' : ''} ${underline ? 'underline' : ''}`}>{!list && (localStorage.getItem("userData"))}
        {list && (<ul>
          {Object.keys(JSON.parse(localStorage.getItem("userData") as string)).map((key, index) => {
            return <li key={index}>{key}: {JSON.parse(localStorage.getItem("userData") as string)[key]}</li>
          })}
          </ul>)}
      </div>



      
    </div>
  );
};

export default Userdata;