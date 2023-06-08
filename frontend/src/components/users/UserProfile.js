import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import axios from "axios";


const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const ProfilePage = () => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [institutename, setInstitutename] = useState("");
  const [role, setRole] = useState("");
  const [parentid, setParentid] = useState("");

  const link = "http://localhost:4000/user/" + sessionStorage.getItem("user_id");
  axios
    .get(link, {
      headers: {
        'access-token': sessionStorage.getItem('token'),
      }
    })
    .then((response) => {
      console.log(response.data);
      setName(response.data.name);
      setInstitutename(response.data.instituteId);
      setRole(response.data.role);
      setParentid(response.data.parentId);
      setId(response.data.id);
    })
    .catch(function (error) {
      console.log(error);
    });

  return (
    <Container maxWidth="sm" className={classes.container}>
      <form>
        <TextField
          label="Name"
          variant="outlined"
          margin="normal"
          fullWidth
          value={name}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          label="ID"
          variant="outlined"
          margin="normal"
          fullWidth
          value={id}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          label="Institute ID"
          variant="outlined"
          margin="normal"
          fullWidth
          value={institutename}
          InputProps={{
            readOnly: true,
          }}
        />

        <TextField
          label="Parent ID"
          variant="outlined"
          margin="normal"
          fullWidth
          value={parentid}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          label="Role"
          variant="outlined"
          margin="normal"
          fullWidth
          value={role}
          InputProps={{
            readOnly: true,
          }}
        />
      </form>
    </Container>
  );
};

export default ProfilePage;
