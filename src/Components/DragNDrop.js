import React, { useCallback, useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { DropzoneArea } from "material-ui-dropzone";
import { ColorExtractor } from "react-color-extractor";
import { DragBox } from "./DragBox";
import { Example } from "./Example";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function DragNDrop({ ...props }) {
  const [file, setFile] = useState(0);
  const [uploaded, setUploaded] = useState(false);
  const [colors, setColors] = useState(0);

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
    if (!uploaded) {
      return (
        <Grid
          item
          xs={12}
          style={{
            minHeight: 0,
            overflow: "hidden",
          }}
        >
          <DropzoneArea
            showPreviews={false}
            showPreviewsInDropzone={false}
            acceptedFiles={["image/*"]}
            filesLimit={1}
            maxFileSize={50000000} // ~5GB
            onDrop={onDrop}
          />
        </Grid>
      );
    }
  };

  return (
    <Container className={classes.root} disableGutters>
      <Grid container style={{ height: "100vh", maxHeight: "100vh" }}>
        {imgOrText()}
        <Grid
          item
          xs={12}
          style={{ minHeight: "80vh", maxHeight: "100vh", overflow: "hidden" }}
        >
          <DndProvider backend={HTML5Backend}>
            <Example img={file} />
          </DndProvider>
        </Grid>
      </Grid>
    </Container>
  );
}
