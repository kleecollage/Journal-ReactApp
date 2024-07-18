import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid, TextField, Typography } from "@mui/material"
import { SaveOutlined } from "@mui/icons-material"
import Swal from 'sweetalert2'
import "sweetalert2/dist/sweetalert2.css";
import { ImageGalery } from "../components"
import { useForm } from "../../hooks";
import { setActiveNote, startSaveNote } from "../../store/journal";

export const NoteView = () => {

    const dispatch = useDispatch()
    const { active:note, messageSaved, isSaving } = useSelector(state => state.journal)
    const { body, title, date, onInputChange, formState } = useForm(note)
    
    const dateString = useMemo(() => {
        const newDate = new Date(date)
        return newDate.toUTCString()
    }, [date])

    const onSaveNote = () => {
        dispatch(startSaveNote())
    }

    useEffect(() => {
      dispatch(setActiveNote(formState))
    }, [formState])
    
    useEffect(() => {
    if (messageSaved.length > 0) {
        Swal.fire('Nota Actualizada', messageSaved, 'success')
    }
    }, [messageSaved])
    

  return (
      <Grid container
          className="animate__animated animate__fadeIn animate__faste"
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          sx={{ mb: 1 }}
      >    
          <Grid item>
              <Typography fontSize={39} fontWeight='light'>{dateString}</Typography>
          </Grid>  
          <Grid item>
              <Button
                disabled={isSaving}
                color="primary"
                sx={{ padding: 2 }}
                onClick={onSaveNote}
              >
                  <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                  Guardar
              </Button>
          </Grid>

          <Grid container>
              <TextField
                  type='text'
                  variant="filled"
                  fullWidth
                  placeholder="Ingrese un título"
                  label="Título"
                  sx={{ border: 'none', mb: 1 }}
                  name="title"
                  value={title}
                  onChange={onInputChange}
              /> 
              <TextField
                  type='text'
                  variant="filled"
                  fullWidth
                  placeholder="¿Qué sucedio en el día de hoy?"
                  multiline
                  minRows={5}
                  name="body"
                  value={body}
                  onChange={onInputChange}
              /> 
          </Grid>

          <ImageGalery/>

      </Grid>
      
  )
}
