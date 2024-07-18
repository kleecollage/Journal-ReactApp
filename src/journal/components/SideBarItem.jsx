import { useMemo } from "react"
import { useDispatch } from "react-redux"
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { TurnedInNot } from "@mui/icons-material"
import { setActiveNote } from "../../store/journal/journalSlice"

export const SideBarItem = ({ title='', body, id, note }) => {
    
    const newTitle = useMemo(() => {
        return title.length > 16
            ? title.substring(0, 16) + '...'
            : title
    }, [title])

    const dispatch = useDispatch();
    const onClickNote = () => {
        dispatch(setActiveNote(note))
    }

  return (
        <ListItem disablePadding>
        <ListItemButton onClick={onClickNote}>
            <ListItemIcon>
                <TurnedInNot/>
            </ListItemIcon>
            <Grid container>
                <ListItemText primary={ newTitle } />
                <ListItemText secondary= { body }  />
            </Grid>
        </ListItemButton>
      </ListItem>
      
  )
}
