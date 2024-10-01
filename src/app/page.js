'use client'
import Navbar from '@/components/navbar'
import { Avatar, Stack, Typography, Tooltip, IconButton } from '@mui/material'
import MainTab from '../components/mainTab'
import FlagIcon from '@mui/icons-material/Flag'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect, Suspense } from 'react'
import { rows } from './dashboard/page'
export const mockData = {
  patientName: 'Mary S.',
  patientAge: 88,
  patientGender: 'F',
  dob: '01-01-1933',
  patientId: '123456',
  arrivalDate: '11-08-2024',
  bed: '13',
  ward: '56',
  treatmentTeam: 'XXX MO'
}

const HomeContent = () => {
  const param = useSearchParams()
  const id = param.get('id')
  const [selectedPatient, setSelectedPatient] = useState(null)
  const router = useRouter()

  useEffect(() => {
    if (id) {
      const patient = rows.find((row) => row.id === parseInt(id))
      if (id === '5') {
        router.push('/new')
      }
      if (patient) {
        setSelectedPatient(patient)
      }
    }
  }, [id])
  return (
    <Stack sx={{ width: '100%', height: '100%', minHeight: '100vh' }}>
      <Navbar />
      <Stack direction='row'>
        <Stack
          sx={{
            padding: '24px',
            backgroundColor: '#CEE9FC',
            width: '18%',
            height: '100%',
            minHeight: '90vh'
          }}
        >
          <Stack
            sx={{ alignItems: 'center', width: '100%', position: 'relative' }}
          >
            <Avatar
              sx={{
                bgcolor: 'orange',
                width: '90px',
                height: '90px',
                fontSize: '48px',
                border: '4px solid white'
              }}
            >
              {selectedPatient?.name?.[0]}
            </Avatar>
            <Stack sx={{ position: 'absolute', bottom: 0, right: 40 }}>
              <Tooltip
                title='Advance care planning (ACP) not done'
                sx={{ cursor: 'pointer' }}
              >
                <Stack direction='row'>
                  <FlagIcon />
                </Stack>
              </Tooltip>
            </Stack>
          </Stack>
          {selectedPatient && (
            <>
              <Typography
                sx={{
                  fontWeight: 'bold',
                  fontSize: '28px',
                  textAlign: 'center',
                  color: '#1876d2'
                }}
              >
                {selectedPatient?.name}
              </Typography>
              <Stack gap={2}>
                <Typography>
                  Patient Age: {selectedPatient.age}, Gender:{' '}
                  {selectedPatient.patientGender}
                </Typography>
                <Typography>
                  Arrival Date:{selectedPatient.arrivalDate}
                </Typography>
                <Typography>MRN: {selectedPatient.id}</Typography>
                <Typography>DOB: {selectedPatient.dateOfBirth}</Typography>
                <Typography>Bed: {selectedPatient.bedNumber}</Typography>
              </Stack>
            </>
          )}
        </Stack>
        <Stack sx={{ width: '100%', height: '100%' }}>
          <MainTab />
        </Stack>
      </Stack>
    </Stack>
  )
}

export default function Home() {
  return (
    <Suspense>
      <HomeContent />
    </Suspense>
  )
}
