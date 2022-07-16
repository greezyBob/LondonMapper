import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'


const Key = () => {

  const modes = [
    'Walking',
    'Tube',
    'Bus',
    'Overground',
    'DLR',
    'National Rail',
    'Tram'
  ]

  const colors = [
    '#606c38',
    '#577590',
    '#f94144',
    '#577590',
    '#219ebc',
    '#cb997e',
    '#023047'
  ]

  return (
    <>
      {modes.map((mode, i) => {
        return (
          <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mr: 1 }}>
            <Box sx={{ height: '15px', width: '15px', background: [colors[i]], mr: 1 }} />
            <Typography>
              {mode}
            </Typography>
          </Box>
        )
      })}
    </>
  )
}

export default Key