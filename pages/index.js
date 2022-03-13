import {
  Autocomplete,
  Container,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useEffect, useState } from "react";
import countries from "../countries";
import { postSubmit } from "../services";

const Home = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [country, setCountry] = useState(null);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const defaultProps = {
    options: countries,
    getOptionLabel: (option) => option.name,
  };

  const onClickHandler = () => {
    const submitData = async () => {
      setLoading(true);

      const result = await postSubmit({
        name: name,
        description: description,
        country: country,
      });

      setLoading(false);

      if (result.status === 202) {
        alert("Submit Success");
        setData({
          name: result.data.name,
          description: result.data.description,
          country: result.data.country.name,
          timeout: result.data.timeout,
        });
        localStorage.setItem("name", result.data.name);
        localStorage.setItem("description", result.data.description);
        localStorage.setItem("country", result.data.country.name);
        localStorage.setItem("timeout", result.data.timeout);
      } else {
        alert(result.data.message);
      }
    };

    submitData();
  };

  useEffect(() => {
    setData({
      name: localStorage.getItem("name"),
      description: localStorage.getItem("description"),
      country: localStorage.getItem("country"),
      timeout: localStorage.getItem("timeout"),
    });
    console.log("ini local storage", localStorage.getItem("name"));
  }, []);

  return (
    <Container maxWidth="false" sx={{ width: "40%", margin: "auto" }}>
      <TextField
        label="Name"
        variant="outlined"
        margin="normal"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <TextField
        label="Description"
        value={description}
        multiline
        rows={4}
        margin="normal"
        fullWidth
        onChange={(e) => setDescription(e.target.value)}
      />

      <Autocomplete
        {...defaultProps}
        value={country}
        onChange={(event, newValue) => {
          setCountry(newValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Country"
            variant="outlined"
            margin="normal"
          />
        )}
      />

      <LoadingButton
        onClick={onClickHandler}
        variant="contained"
        loading={loading}
        sx={{ marginTop: "5px" }}
      >
        Submit
      </LoadingButton>

      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        <ListItem>
          <ListItemText primary="Name" secondary={data?.name || "unknown"} />
        </ListItem>

        <ListItem>
          <ListItemText
            primary="Description"
            secondary={data?.description || "unknown"}
          />
        </ListItem>

        <ListItem>
          <ListItemText
            primary="Country"
            secondary={data?.country || "unknown"}
          />
        </ListItem>

        <ListItem>
          <ListItemText
            primary="Timeout"
            secondary={data?.timeout || "unknown"}
          />
        </ListItem>
      </List>
    </Container>
  );
};

export default Home;
