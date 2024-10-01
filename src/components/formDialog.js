import * as React from 'react'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'
import { Stack, TextField } from '@mui/material'
import { useRouter } from 'next/navigation'
import { rows } from '@/app/dashboard/page'
import { EditNote, EditOff } from '@mui/icons-material'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}))

const Step1 = ({ handleNextStep, handleClose }) => {
  const router = useRouter()

  const handleClickGoLatest = () => {
    router.push('/latest')
  }
  const handleSeeReferral = () => {
    handleNextStep()
  }

  const handleDecline = () => {
    router.replace('/new?decline=true')
    handleClose()
  }
  return (
    <>
      <DialogTitle
        sx={{ m: 0, p: 2, fontWeight: 'bold', position: 'relative' }}
        id='customized-dialog-title'
      >
        Advance Care Planning (ACP)
        <IconButton
          aria-label='close'
          onClick={handleClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500]
          })}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Typography gutterBottom>
          Patient is recommended for General ACP due to the following reasons:
        </Typography>
        <Typography variant='body1'>
          - End-stage Renal Failure <br />- Early cognitive impairment
        </Typography>
      </DialogContent>

      <DialogActions>
        <Stack sx={{ width: '100%', gap: 2 }}>
          <Button
            sx={{
              backgroundColor: '#d5d5d5',
              color: '#000000'
            }}
            variant='contained'
            onClick={() => handleClickGoLatest()}
          >
            Proceed to read the latest summary on ACP-related discussion
          </Button>
          <Button
            sx={{
              backgroundColor: '#d5d5d5',
              color: '#000000'
            }}
            variant='contained'
            onClick={() => handleSeeReferral()}
          >
            Patient consent to be referred to ACP facilitators for ACP
          </Button>
          <Button
            sx={{
              backgroundColor: '#d5d5d5',
              color: '#000000'
            }}
            variant='contained'
            onClick={() => handleDecline()}
          >
            Patient declined ACP
          </Button>
        </Stack>
      </DialogActions>
    </>
  )
}
const Step2 = ({ handleClose, handleReset }) => {
  const [isEdit, setIsEdit] = React.useState(false)
  const router = useRouter()
  const handleEdit = () => {
    setIsEdit(!isEdit)
  }
  const handleClickGoLatest = () => {
    router.replace('/new?new-note=true')
    handleClose()
    handleReset()
  }
  return (
    <>
      <DialogTitle
        sx={{ m: 0, p: 2, fontWeight: 'bold', position: 'relative' }}
        id='customized-dialog-title'
      >
        Referral letter
        {isEdit ? (
          <IconButton
            aria-label='close'
            onClick={handleEdit}
            sx={(theme) => ({
              position: 'absolute',
              right: 40,
              top: 8,
              color: theme.palette.grey[500]
            })}
          >
            <EditOff />
          </IconButton>
        ) : (
          <IconButton
            aria-label='close'
            onClick={handleEdit}
            sx={(theme) => ({
              position: 'absolute',
              right: 40,
              top: 8,
              color: theme.palette.grey[500]
            })}
          >
            <EditNote />
          </IconButton>
        )}
        <IconButton
          aria-label='close'
          onClick={handleClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500]
          })}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent width='100%' dividers>
        {isEdit ? (
          <TextField
            fullWidth
            multiline
            value={` Dear Dr XXX, I am writing to refer my patient, ${rows[4].name},
          ${rows[4].dateOfBirth}, for advance care planning services.{' '}
          ${rows[4].name}, has been under my care and presents with [brief
          description of the medical condition or concerns].
          <br />
          <br /> Given the complexities of his health status, including
          [specific concerns that necessitate advance care planning, e.g.,
          chronic illness, progressive disease, etc.], I believe it is
          essential for ${rows[4].name} to engage in advance care planning to
          discuss his preferences and values regarding future healthcare
          decisions. ${rows[4].name} has expressed interest in understanding
          his options and wishes regarding end-of-life care, and I believe
          your expertise will provide valuable support in facilitating these
          important conversations.
          <br />
          <br></br> Please find attached [any relevant medical records, if
          appropriate, or mention that they are available upon request].
          Thank you for your attention to this matter. I appreciate your
          collaboration in providing comprehensive care for ${rows[4].name}.
          Please feel free to contact me if you need any further
          information.`}
          />
        ) : (
          <Typography gutterBottom>
            Dear Dr XXX, I am writing to refer my patient, {rows[4].name},
            {rows[4].dateOfBirth}, for advance care planning services.{' '}
            {rows[4].name}, has been under my care and presents with [brief
            description of the medical condition or concerns].
            <br />
            <br /> Given the complexities of his health status, including
            [specific concerns that necessitate advance care planning, e.g.,
            chronic illness, progressive disease, etc.], I believe it is
            essential for {rows[4].name} to engage in advance care planning to
            discuss his preferences and values regarding future healthcare
            decisions. {rows[4].name} has expressed interest in understanding
            his options and wishes regarding end-of-life care, and I believe
            your expertise will provide valuable support in facilitating these
            important conversations.
            <br />
            <br></br> Please find attached [any relevant medical records, if
            appropriate, or mention that they are available upon request]. Thank
            you for your attention to this matter. I appreciate your
            collaboration in providing comprehensive care for {rows[4].name}.
            Please feel free to contact me if you need any further information.
          </Typography>
        )}
      </DialogContent>

      <DialogActions>
        <Stack sx={{ width: '200px', gap: 2 }}>
          <Button variant='contained' onClick={() => handleClickGoLatest()}>
            Confirm
          </Button>
        </Stack>
        <Stack sx={{ width: '200px', gap: 2 }}>
          <Button variant='outlined' onClick={() => handleClose()}>
            Cancel
          </Button>
        </Stack>
      </DialogActions>
    </>
  )
}

export default function FormDialog({ children }) {
  const [open, setOpen] = React.useState(false)
  const [currentStep, setCurrentStep] = React.useState(1)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSeeReferral = () => {
    setCurrentStep(2)
  }

  return (
    <>
      <Stack onClick={handleClickOpen} sx={{ cursor: 'pointer' }}>
        {children}
      </Stack>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
      >
        {currentStep === 1 && (
          <Step1 handleNextStep={handleSeeReferral} handleClose={handleClose} />
        )}
        {currentStep === 2 && (
          <Step2
            handleClose={handleClose}
            handleReset={() => {
              setCurrentStep(1)
            }}
          />
        )}
      </BootstrapDialog>
    </>
  )
}
