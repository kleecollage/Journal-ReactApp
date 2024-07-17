import { useMemo, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, TextField, Typography, Button, Link, Alert } from "@mui/material"
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { startCreatingUserWithEmailPassword } from '../../store/auth';

const formData = {
  email: '',
  password: '',
  displayName: ''
}

const formValidations = {
  email: [(value) => value.includes('@'), 'El correo debe tener @'],
  password: [(value) => value.length >= 6, 'Contraseña debe tener mas de 6 caracteres'],
  displayName: [(value) => value.length >=1, 'El nombre es obligatorio']
}


export const RegisterPage = () => {

  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { status, errorMessage } = useSelector(state => state.auth);
  const isCheckingAuthentication = useMemo(() => status === 'checking', [status])

  const {
    formState, displayName, email, password, onInputChange,
    isFormValid, displayNameValid, emailValid, passwordValid
  } = useForm(formData, formValidations)

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    dispatch(startCreatingUserWithEmailPassword(formState));
  }

  return (
    
    <AuthLayout title='Crear Cuenta'>
      <h1>FormValid: { isFormValid ? 'Valido' : 'Incorrecto' }</h1>
      <form
        onSubmit={onSubmit}
        className="animate__animated animate__fadeIn animate__faster"
      >
        <Grid container>
          {/* ##########  Inputs  ########## */}
          <Grid item xs={12} sx={{mt: 2}}>
            <TextField
              label="Nombre completo"
              type="text"
              placeholder="Jhon Doe"
              fullWidth
              name="displayName"
              value={displayName}
              onChange={onInputChange}
              error={!!displayNameValid && formSubmitted}
              helperText={displayNameValid}
            />
          <Grid item xs={12} sx={{mt: 2}}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@mail.com"
              fullWidth              
              name="email"
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmitted}
              helperText={emailValid}
            />
          </Grid>
          <Grid item xs={12} sx={{mt: 2}}> 
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth              
              name="password"
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid}
            />
            </Grid>
            {/* ##########  Error message  ########## */}
            <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
              <Grid item xs={12} display={!!errorMessage ? '' : 'none'}>
                <Alert severity='error'>{ errorMessage }</Alert>                      
              </Grid>
            </Grid>        
            {/* ##########  Buttons  ########## */}
            <Grid container spacing={2} sx={{mb: 2, mt: 1}}>
              <Grid item xs={12}>
                <Button
                  disabled={ isCheckingAuthentication }
                  type='submit'
                  variant='contained'
                  fullWidth>
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