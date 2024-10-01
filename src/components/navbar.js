'use client'

import React, { useEffect } from 'react'
import { Stack, Box, Tabs, Tab, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import MainTab from './mainTab'
import { useRouter } from 'next/navigation'

const CustomTabs = styled(Tabs)(({ theme }) => ({
  borderBottom: 0
}))

const CustomTab = styled(Tab)(({ theme }) => ({
  fontWeight: 'bold',
  color: 'black',
  '&.Mui-selected': {
    color: '#1358fa'
  }
}))

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

function Navbar() {
  const [value, setValue] = React.useState(0)
  const router = useRouter()

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Stack
      sx={{
        backgroundColor: '#8FD0F9',
        height: 'fit-content',
        padding: '0 24px'
      }}
    >
      <Stack
        direction='row'
        sx={{
          alignItems: 'center',
          gap: '24px'
        }}
      >
        <Typography
          style={{
            color: '#C32020',
            fontStyle: 'bold',
            fontSize: '32px'
          }}
        >
          APIK
        </Typography>

        <Box>
          <CustomTabs
            value={value}
            onChange={handleChange}
            aria-label='basic tabs example'
            TabIndicatorProps={{
              style: {
                display: 'none'
              }
            }}
          >
            <CustomTab label='Patient list' {...a11yProps(0)} />

            <CustomTab label='Appts' {...a11yProps(1)} />
            <CustomTab label='Patient station' {...a11yProps(2)} />
          </CustomTabs>
        </Box>
      </Stack>
    </Stack>
  )
}

export default Navbar
