import React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'
import { Button, Stack } from '@mui/material'
import {
  AddBoxOutlined,
  AddCircleOutlineOutlined,
  EditNote
} from '@mui/icons-material'
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

const acpRows = [
  {
    id: 1,
    dateOfDocumentation: '2024-09-01',
    title: 'Patient Wishes Discussed',
    doneBy: 'Dr. Jon Snow',
    specialty: 'Inpatient- Palliative Care'
  },
  {
    id: 2,
    dateOfDocumentation: '2024-08-15',
    title: 'Advanced Directives Completed',
    doneBy: 'Dr. Cersei Lannister',
    specialty: 'Outpatient- Oncology'
  },
  {
    id: 3,
    dateOfDocumentation: '2024-09-10',
    title: 'End-of-Life Care Preferences',
    doneBy: 'Dr. Arya Stark',
    specialty: 'Geriatrics'
  },
  {
    id: 4,
    dateOfDocumentation: '2024-07-20',
    title: 'Goals of Care Discussed',
    doneBy: 'Dr. Daenerys Targaryen',
    specialty: 'Internal Medicine'
  },
  {
    id: 5,
    dateOfDocumentation: '2024-08-25',
    title: 'Resuscitation Status Addressed',
    doneBy: 'Dr. Tyrion Lannister',
    specialty: 'Emergency Medicine'
  },
  {
    id: 6,
    dateOfDocumentation: '2024-09-05',
    title: 'Living Will Drafted',
    doneBy: 'Dr. Sansa Stark',
    specialty: 'Family Medicine'
  },
  {
    id: 7,
    dateOfDocumentation: '2024-08-30',
    title: 'Patient Care Preferences Documented',
    doneBy: 'Dr. Bran Stark',
    specialty: 'Neurology'
  },
  {
    id: 8,
    dateOfDocumentation: '2024-07-15',
    title: 'Discussion of DNR Orders',
    doneBy: 'Dr. Jaime Lannister',
    specialty: 'Cardiology'
  }
]

const newAcpRows = [
  {
    id: 1,
    dateOfDocumentation: '2024-09-01',
    title: 'Patient Wishes Discussed',
    doneBy: 'Dr. Jon Snow',
    specialty: 'Inpatient- Palliative Care'
  }
]

const newAcpRowsWithNewReferral = [
  {
    id: 2,
    dateOfDocumentation: '2024-09-15',
    title: 'New Referral',
    doneBy: 'Dr Henry',
    specialty: 'Geriatric Care'
  },
  {
    id: 1,
    dateOfDocumentation: '2024-09-01',
    title: 'Patient Wishes Discussed',
    doneBy: 'Dr. Jon Snow',
    specialty: 'Inpatient- Palliative Care'
  }
]

const newAcpRowsWithNewDeclined = [
  {
    id: 2,
    dateOfDocumentation: '2024-09-15',
    title: 'Pt declined ACP referral',
    doneBy: 'Dr Henry',
    specialty: 'Geriatric Care'
  },
  {
    id: 1,
    dateOfDocumentation: '2024-09-01',
    title: 'Patient Wishes Discussed',
    doneBy: 'Dr. Jon Snow',
    specialty: 'Inpatient- Palliative Care'
  }
]

const acpColumns = [
  {
    field: 'dateOfDocumentation',
    headerName: 'Date of Documentation',
    width: 200
  },
  {
    field: 'title',
    headerName: 'Title',
    width: 300,
    renderCell: (params) => (
      <a
        href={`/latest?type=${
          params.value === 'New Referral'
            ? 'referral'
            : params?.value?.includes('declined')
            ? 'decline'
            : 'wish'
        }`}
      >
        {params.value}
      </a>
    )
  },
  { field: 'doneBy', headerName: 'Done By', width: 200 },
  { field: 'specialty', headerName: 'Specialty', width: 200 },
  {
    field: 'edit',
    headerName: 'Action',
    width: 150,
    renderCell: (params) => (
      <Button variant='text' onClick={() => handleEdit(params.row)}>
        <EditNote />
      </Button>
    )
  }
]

const mockDataEncounter = {}

function NavigatorTabs({ type, dataType, isNewNote, isDeclined }) {
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const handleAddNotes = () => {}

  return (
    <div>
      <Tabs value={value} onChange={handleChange}>
        <Tab label='All notes' />
        <Tab label='Progress' />
        <Tab label='Consultations' />
      </Tabs>
      <CustomTabPanel value={value} index={0}>
        <Stack direction='row' justifyContent='flex-end'>
          <Button
            endIcon={<AddCircleOutlineOutlined />}
            variant='contained'
            onClick={handleAddNotes}
            sx={{ mb: 2, width: '150px' }}
          >
            Add Notes
          </Button>
        </Stack>
        {type === 'acp' ? (
          <DataGrid
            rows={
              isNewNote && dataType === 'new'
                ? newAcpRowsWithNewReferral
                : isDeclined && dataType === 'new'
                ? newAcpRowsWithNewDeclined
                : dataType === 'new'
                ? newAcpRows
                : acpRows
            }
            columns={acpColumns}
            pageSize={5}
            autoHeight
          />
        ) : null}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        WIP
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        WIP
      </CustomTabPanel>
    </div>
  )
}

export default NavigatorTabs
