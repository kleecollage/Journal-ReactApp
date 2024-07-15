import { Link as RouterLink } from 'react-router-dom';
import { Google } from "@mui/icons-material"
import { Grid, TextField, Typography, Button, Link } from "@mui/material"
import { AuthLayout } from '../layout/AuthLayout';

export const RegisterPage = () => {
  
  return (
    
    <AuthLayout title='Crear Cuenta'>
      <form action="">
        <Grid container>
          {/* ##########  Inputs  ########## */}
          <Grid item xs={12} sx={{mt: 2}}>
            <TextField
              label="Nombre completo"
              type="text"
              placeholder="Jhon Doe"
              fullWidth
            />
          <Grid item xs={12} sx={{mt: 2}}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@mail.com"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{mt: 2}}> 
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
            />
            </Grid>
            {/* ##########  Buttons  ########## */}
            <Grid container spacing={2} sx={{mb: 2, mt: 1}}>
              <Grid item xs={12}>
                <Button variant='contained' fullWidth>
                  Crear Cuenta                  
                </Button>                
              </Grid>                      
            </Grid>        
            {/* ##########  Router  ########## */}
            <Grid container direction='row' justifyContent='end'>
              <Typography sx={{mr: 1}}>¿Ya tienes cuenta?</Typography>
              <Link component={RouterLink} color='inherit' to="/auth/">
                Ingresar
              </Link>
            </Grid>

          </Grid>
        </Grid>
      </form>
    </AuthLayout>


  )
}