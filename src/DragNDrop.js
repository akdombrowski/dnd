import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Grid from "@material-ui/core/Grid";
import { sizing } from "@material-ui/system";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { DropzoneArea } from "material-ui-dropzone";
import { ColorExtractor } from "react-color-extractor";

export default function DragNDrop({ ...props }) {
  const [file, setFile] = useState(0);
  const [uploaded, setUploaded] = useState(false);
  const [colors, setColors] = useState(0);

  useEffect(() => {
    console.log("useEffect file");
    console.log(file);
    if (file) {
      setUploaded(true);
    }
    console.log(uploaded);
  });
  const useStyles = makeStyles((theme) => ({
    root: {
      height: "100%",
    },
    dropzoneArea: {
      backgroundColor:
        theme.palette.type === "light"
          ? theme.palette.grey[50]
          : theme.palette.grey[900],
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
    image: {
      backgroundImage: file,
      backgroundRepeat: "no-repeat",
      backgroundColor:
        theme.palette.type === "light"
          ? theme.palette.grey[50]
          : theme.palette.grey[900],
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  const classes = useStyles();

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    let uploadedFile = URL.createObjectURL(
      acceptedFiles[acceptedFiles.length - 1]
    );
    setFile(uploadedFile);
    setUploaded(true);
  }, []);

  const imgOrText = () => {
    if (!file) {
      return (
        <DropzoneArea
          showPreviews={false}
          showPreviewsInDropzone={false}
          acceptedFiles={["image/*"]}
          filesLimit={1}
          maxFileSize={50000000} // ~5GB
          onDrop={onDrop}
        />
      );
    }
  };

  return (
    <Container className={classes.root} disableGutters>
      <Grid container>
        <Grid
          item
          xs={12}
          style={{
            overflow: "hidden",
          }}
        >
          {imgOrText()}

          <img
            src={file}
            style={{
              width: "auto",
              height: "100%",
              horizontalAlign: "middle",
              marginLeft: "-50%",
            }}
            alt="preview"
          />
        </Grid>
      </Grid>
    </Container>
  );
}
