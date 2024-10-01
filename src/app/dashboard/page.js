'use client'
import React, { Suspense, useEffect, useState } from 'react'

import Navbar from '@/components/navbar'
import { Stack, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

const columns = [
  {
    field: 'name',
    headerName: 'Patient Name',
    width: 200,
    renderCell: (params) => (
      <Link
        href={`/?id=${params.id}`}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        {params.value}
      </Link>
    )
  },
  { field: 'age', headerName: 'Age', type: 'number', width: 110 },
  { field: 'bedNumber', headerName: 'Bed Number', width: 120 },
  { field: 'ward', headerName: 'Ward', width: 150 },
  { field: 'description', headerName: 'Patient Description', width: 300 }
]

export const rows = [
  {
    id: 1,
    name: 'Mary S',
    age: 88,
    bedNumber: 'A1',
    ward: 'General',
    description: 'Patient admitted for observation following a mild stroke.',
    arrivalDate: '2024-08-11',
    dischargeInfo: 'Expected discharge on 2024-09-05.',
    allergyStatus: 'No known allergies',
    dateOfBirth: '1933-01-21',
    patientGender: 'F'
  },
  {
    id: 2,
    name: 'Cersei Lannister',
    age: 45,
    bedNumber: 'B2',
    ward: 'Cardiology',
    description:
      'Patient undergoing treatment for hypertension and chest pain.',
    arrivalDate: '2024-08-28',
    dischargeInfo: 'Discharged on 2024-09-02.',
    allergyStatus: 'Allergic to penicillin',
    dateOfBirth: '1979-05-19',
    patientGender: 'M'
  },
  {
    id: 3,
    name: 'Arya Stark',
    age: 67,
    bedNumber: 'C3',
    ward: 'Orthopedics',
    description: 'Patient recovering from hip replacement surgery.',
    arrivalDate: '2024-08-30',
    dischargeInfo: 'Discharge planned for 2024-09-07.',
    allergyStatus: 'No known allergies',
    dateOfBirth: '1956-07-15',
    patientGender: 'F'
  },
  {
    id: 4,
    name: 'Daenerys Targaryen',
    age: 55,
    bedNumber: 'D4',
    ward: 'Oncology',
    description: 'Patient receiving chemotherapy for breast cancer.',
    arrivalDate: '2024-08-15',
    dischargeInfo: 'Discharged on 2024-08-20.',
    allergyStatus: 'Allergic to sulfa drugs',
    dateOfBirth: '1969-12-01',
    patientGender: 'M'
  },
  {
    id: 5,
    name: 'Tyrion Lannister',
    age: 73,
    bedNumber: 'E5',
    ward: 'Geriatrics',
    description: 'Patient with dementia, requiring constant supervision.',
    arrivalDate: '2024-08-10',
    dischargeInfo: 'Pending evaluation for home care.',
    allergyStatus: 'No known allergies',
    dateOfBirth: '1950-06-21',
    patientGender: 'M'
  },
  {
    id: 6,
    name: 'Sansa Stark',
    age: 22,
    bedNumber: 'F6',
    ward: 'Pediatrics',
    description: 'Patient admitted for asthma exacerbation.',
    arrivalDate: '2024-09-03',
    dischargeInfo: 'Discharge expected on 2024-09-06.',
    allergyStatus: 'Allergic to peanuts',
    dateOfBirth: '2002-04-08',
    patientGender: 'F'
  },
  {
    id: 7,
    name: 'Bran Stark',
    age: 38,
    bedNumber: 'G7',
    ward: 'Neurology',
    description: 'Patient experiencing seizures, under evaluation.',
    arrivalDate: '2024-08-29',
    dischargeInfo: 'Evaluation ongoing, discharge TBD.',
    allergyStatus: 'No known allergies',
    dateOfBirth: '1986-11-03',
    patientGender: 'M'
  },
  {
    id: 8,
    name: 'Jaime Lannister',
    age: 50,
    bedNumber: 'H8',
    ward: 'Surgery',
    description: 'Patient scheduled for gallbladder removal.',
    arrivalDate: '2024-08-31',
    dischargeInfo: 'Discharge planned for 2024-09-03.',
    allergyStatus: 'Allergic to latex',
    dateOfBirth: '1974-09-10',
    patientGender: 'M'
  }
]

const PatientDataGrid = ({ setSelectedPatient }) => {
  const handleRowClick = (params) => {
    setSelectedPatient(params.row)
    // You could also handle navigation here if needed
    console.log(`Selected Patient: ${params.row.name}`)
  }

  return (
    <Stack style={{ height: '80%', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        onRowClick={handleRowClick}
        autoHeight
      />
    </Stack>
  )
}

function Dashboard() {
  const [selectedPatient, setSelectedPatient] = useState(rows[0])

  return (
    <Suspense>
      <Stack sx={{ width: '100%', height: '100%', minHeight: '100vh' }}>
        <Navbar />
        <Stack
          direction='row'
          justifyContent='space-between'
          sx={{
            backgroundColor: '#CEE9FC',
            padding: '24px'
          }}
        >
          <Stack>
            <Typography sx={{ fontWeight: 'bold', fontSize: '24px' }}>
              {selectedPatient.name}
            </Typography>
            <Typography>
              Age: {selectedPatient.age}, Bed: {selectedPatient.bedNumber},
              Ward: {selectedPatient.ward}
            </Typography>
            <Typography>DOB: {selectedPatient.dateOfBirth}</Typography>
            <Typography>
              Arrival Date: {selectedPatient.arrivalDate},
            </Typography>
            <Typography>
              {selectedPatient.dischargeInfo
                ? selectedPatient.dischargeInfo
                : 'Not available'}
            </Typography>
          </Stack>
          <Stack>
            <Stack
              sx={{
                backgroundColor: 'white',
                padding: '24px',
                borderRadius: '4px'
              }}
            >
              <Typography
                sx={{
                  color: 'red'
                }}
              >
                Allergy Status:{' '}
              </Typography>
              <Typography>
                {selectedPatient.allergyStatus
                  ? selectedPatient.allergyStatus
                  : 'None'}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        <Stack
          flexDirection='row'
          sx={{
            height: '100%'
          }}
        >
          <Stack
            sx={{
              backgroundColor: '#CEE9FC',
              height: '100%',
              width: '15%',
              minHeight: '85vh'
            }}
          ></Stack>
          <Stack sx={{ height: '100%', padding: '24px', width: '100%' }}>
            <Typography sx={{ marginBottom: '24px', fontWeight: 'bold' }}>
              Patient list
            </Typography>
            <PatientDataGrid setSelectedPatient={setSelectedPatient} />
          </Stack>
        </Stack>
      </Stack>
    </Suspense>
  )
}

export default Dashboard
