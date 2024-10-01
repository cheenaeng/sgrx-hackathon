import * as React from 'react'
import Box from '@mui/material/Box'
import {
  Stack,
  Alert,
  Typography,
  Button,
  IconButton,
  Slide
} from '@mui/material'
import NavigatorTabs from './navigatorSpecific'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { Cancel } from '@mui/icons-material'
import FormDialog from './formDialog'
import { rows } from '@/app/dashboard/page'
import { useRouter, useSearchParams } from 'next/navigation'

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

const LatestACP = () => {
  return (
    <Stack>
      <Typography style={{ fontWeight: 'bold' }}>Notes: </Typography>
      <Typography style={{ fontWeight: 'bold' }}>
        Encounter date : 2024-09-01
      </Typography>
      <Stack
        sx={{
          border: '1px solid #e0e0e0',
          padding: '24px',
          margin: '24px 0'
        }}
      >
        <Typography>
          <strong>Patient Wishes Discussed</strong>
          <br />
          <strong>Patient Name:</strong> {rows[4].name}
          <br />
          <strong>Date of Discussion:</strong> 2024-09-01
          <br />
          <br />
          Today, I had a detailed discussion with the patient regarding their
          wishes concerning their medical care and treatment preferences. The
          following points were covered:
          <br />
          <br />
          <strong>Goals of Care:</strong> The patient expressed their wishes
          regarding the desired outcomes of their treatment. They prioritize
          [quality of life/comfort measures/aggressive treatment/other
          preferences].
          <br />
          <br />
          <strong>Advance Directives:</strong> The patient [does/does not] have
          an existing advance directive. The patient has been informed of the
          option to create or update their directive as necessary.
          <br />
          <br />
          <strong>Resuscitation Preferences (DNR/DNI):</strong> The patient
          [has/has not] expressed a preference for "Do Not Resuscitate" (DNR) or
          "Do Not Intubate" (DNI) status. [Insert any specific patient wishes
          regarding resuscitation].
          <br />
          <br />
          <strong>End-of-Life Care:</strong> The patient wishes to focus on
          [palliative care/comfort measures/full medical intervention/other
          preferences] in the event of life-threatening illness or severe
          deterioration.
          <br />
          <br />
          The patient's preferences will be respected, and their care plan will
          be tailored to align with these wishes. Further discussions will be
          conducted as necessary to ensure clarity and understanding.
          <br />
          <br />
          <strong>Physician's Name</strong>
          <br />
          Signature: ____________________
          <br />
          <strong>Date:</strong> [Date]
        </Typography>
      </Stack>
    </Stack>
  )
}

const ReferralLetter = () => {
  return (
    <Stack>
      <Typography style={{ fontWeight: 'bold' }}>Referral Letter </Typography>
      <Typography style={{ fontWeight: 'bold' }}>
        Encounter date : 2024-09-15
      </Typography>
      <Typography gutterBottom>
        Dear Dr XXX, I am writing to refer my patient, {rows[4].name},
        {rows[4].dateOfBirth}, for advance care planning services.{' '}
        {rows[4].name}, has been under my care and presents with [brief
        description of the medical condition or concerns].
        <br />
        <br /> Given the complexities of his health status, including [specific
        concerns that necessitate advance care planning, e.g., chronic illness,
        progressive disease, etc.], I believe it is essential for {
          rows[4].name
        }{' '}
        to engage in advance care planning to discuss his preferences and values
        regarding future healthcare decisions. {rows[4].name} has expressed
        interest in understanding his options and wishes regarding end-of-life
        care, and I believe your expertise will provide valuable support in
        facilitating these important conversations.
        <br />
        <br></br> Please find attached [any relevant medical records, if
        appropriate, or mention that they are available upon request]. Thank you
        for your attention to this matter. I appreciate your collaboration in
        providing comprehensive care for {rows[4].name}. Please feel free to
        contact me if you need any further information.
      </Typography>
    </Stack>
  )
}

const patientDeclinedReferral = {
  name: 'Tyrion Lannister',
  dateOfBirth: '1950-06-21',
  declinedReason:
    'Patient expressed a preference to manage care independently at this time.',
  medicalCondition: 'chronic obstructive pulmonary disease',
  specificConcerns: 'frequent exacerbations requiring hospitalization.'
}
const DeclinedNotes = () => {
  const patient = patientDeclinedReferral

  return (
    <Stack>
      <Typography style={{ fontWeight: 'bold' }}>Referral Letter </Typography>
      <Typography style={{ fontWeight: 'bold' }}>
        Encounter date: 2024-09-15
      </Typography>
      <Typography gutterBottom>
        Dear Dr XXX, I am writing to inform you about my patient, {patient.name}
        , born on {patient.dateOfBirth}, regarding advance care planning
        services.
        {patient.name} has been under my care and presents with{' '}
        {patient.medicalCondition}.
        <br />
        <br /> During our recent discussions, {patient.name} expressed a
        preference to manage his care independently at this time. Although I
        believe that advance care planning would be beneficial, he has opted to
        decline the referral for these services.
        <br />
        <br /> Specifically, {patient.name} is currently dealing with{' '}
        {patient.specificConcerns}
        and understands the importance of planning for future healthcare
        decisions. However, he feels confident in his ability to navigate his
        current health situation without further assistance.
        <br />
        <br /> I appreciate your understanding and support regarding this
        matter. Please feel free to reach out if you have any questions or
        require further information.
      </Typography>
    </Stack>
  )
}

export default function CenteredTabs({ dataType }) {
  const [value, setValue] = React.useState(0)
  const [isAlertOpen, setIsAlertOpen] = React.useState(true)
  const param = useSearchParams()
  const isNewNote = param.get('new-note') === 'true'
  const isReferral = param.get('type') === 'referral'
  const isDeclined = param.get('decline') === 'true'

  const isDeclinedType = param.get('type') === 'decline'
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleClickSeeMore = () => {}

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Stack
        direction='row'
        justifyContent='space-between'
        sx={{ width: '100%' }}
      >
        <Stack>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label='custom tabs example'
            indicatorColor='transparent' // Disable default indicator
          >
            {['ACP', 'Encounter', 'Medications'].map((label, index) => (
              <Tab
                key={index}
                label={label}
                {...a11yProps(index)}
                sx={{
                  // Styling for the tab
                  borderTop:
                    value === index
                      ? '4px solid #7633ac'
                      : '1px solid transparent',
                  borderRight:
                    value === index
                      ? '1px solid #e0e0e0'
                      : '1px solid transparent',
                  borderLeft:
                    value === index
                      ? '1px solid #e0e0e0'
                      : '1px solid transparent',
                  borderBottom:
                    value === index
                      ? '1px solid transparent'
                      : '1px solid #e0e0e0',
                  backgroundColor: value === index ? '#fff' : 'transparent',
                  position: 'relative',
                  padding: '10px 20px',
                  '&:before': {
                    content: '""',
                    position: 'absolute',
                    bottom: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '100%',
                    height: '2px', // Line thickness
                    backgroundColor: value === index ? '#000' : 'transparent', // Line color
                    transition: 'background-color 0.3s'
                  }
                }}
              />
            ))}
          </Tabs>
        </Stack>
        <Stack sx={{ borderBottom: '1px solid #e0e0e0', width: '100%' }} />
      </Stack>

      <CustomTabPanel value={value} index={0}>
        <Stack
          sx={{
            height: '100%'
          }}
        >
          {dataType === 'latest' ? (
            isReferral ? (
              <ReferralLetter />
            ) : isDeclinedType ? (
              <DeclinedNotes />
            ) : (
              <LatestACP />
            )
          ) : (
            <NavigatorTabs
              type='acp'
              dataType={dataType}
              isNewNote={isNewNote}
              isDeclined={isDeclined}
            />
          )}
        </Stack>
        <Slide
          direction='up'
          in={isAlertOpen && dataType === 'new' && !isDeclined && !isNewNote}
        >
          <Alert
            severity='warning'
            sx={{ position: 'fixed', bottom: 10, width: '75vw' }}
          >
            <Stack width='100%' direction='row' justifyContent='space-between'>
              <Stack>
                <Typography>Patient has not done ACP</Typography>
                <FormDialog>
                  <Button
                    variant='text'
                    sx={{
                      color: 'red'
                    }}
                    onClick={handleClickSeeMore}
                  >
                    Click here to see more
                  </Button>
                </FormDialog>
              </Stack>
              <Box sx={{ position: 'absolute', right: 20, top: 0 }}>
                <IconButton
                  onClick={() => {
                    setIsAlertOpen(false)
                  }}
                >
                  <Cancel />
                </IconButton>
              </Box>
            </Stack>
          </Alert>
        </Slide>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <NavigatorTabs type='encounter' />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>
    </Box>
  )
}
