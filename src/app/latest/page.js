'use client'
import Navbar from '@/components/navbar'
import { Avatar, Stack, Typography, Tooltip } from '@mui/material'
import MainTab from '@/components/mainTab'
import FlagIcon from '@mui/icons-material/Flag'
import { rows } from '../dashboard/page'
import { Suspense } from 'react'
export const mockData = rows[4]

export default function LatestPage() {
  return (
    <Suspense>
      <Stack sx={{ width: '100%', height: '100%', minHeight: '100vh' }}>
        <Navbar />
        <Stack direction='row' height='100%'>
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
                T
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
            <Typography
              sx={{
                fontWeight: 'bold',
                fontSize: '28px',
                textAlign: 'center',
                color: '#1876d2'
              }}
            >
              {mockData.name}
            </Typography>
            <Stack gap={2}>
              <Typography>Patient Age: {mockData.age}, Gender:M</Typography>
              <Typography>Arrival Date:{mockData.arrivalDate}</Typography>
              <Typography>MRN: {mockData.id}321255</Typography>
              <Typography>DOB: {mockData.dateOfBirth}</Typography>
              <Typography>Bed: {mockData.bedNumber}</Typography>
            </Stack>
          </Stack>
          <Stack sx={{ width: '100%', height: '100%' }}>
            <MainTab dataType='latest' />
          </Stack>
        </Stack>
      </Stack>
    </Suspense>
  )
}
