import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'


const Key = () => {

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mr: 1 }}>
        <Box sx={{ height: '15px', width: '15px', background: '#727070', mr: 1 }} />
        <Typography>
          Walking
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mr: 1 }}>
        <Box sx={{ height: '15px', width: '15px', background: '#000000', mr: 1 }} />
        <Typography>
          Tube
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mr: 1 }}>
        <Box sx={{ height: '15px', width: '15px', background: '#cc3232', mr: 1 }} />
        <Typography>
          Bus
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mr: 1 }}>
        <Box sx={{ height: '15px', width: '15px', background: '#e7690f', mr: 1 }} />
        <Typography>
          Overground
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mr: 1 }}>
        <Box sx={{ height: '15px', width: '15px', background: '#219ebc', mr: 1 }} />
        <Typography>
          DLR
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mr: 1 }}>
        <Box sx={{ height: '15px', width: '15px', background: '#cb997e', mr: 1 }} />
        <Typography>
          National Rail
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mr: 1 }}>
        <Box sx={{ height: '15px', width: '15px', background: '#65cc01', mr: 1 }} />
        <Typography>
          Tram
        </Typography>
      </Box>
    </>
  )
}

export default Key