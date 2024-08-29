import { useEffect, useState } from "react"
import * as d3 from "d3"
import { Box } from "@chakra-ui/react"
import { GeoJsonProperties, FeatureCollection, Geometry } from "geojson"
import { useNavigate } from "react-router-dom"

// Import your geojson data with correct typing
import geojsonData from "@/data/states.geo.json"

// Define the type for your geojson data
const typedGeojsonData = geojsonData as FeatureCollection<
  Geometry,
  GeoJsonProperties
>

const pathGenerator = (
  [width, height]: [number, number],
  geojson:
    | d3.GeoGeometryObjects
    | d3.ExtendedFeature<d3.GeoGeometryObjects | null, GeoJsonProperties>
    | d3.ExtendedFeatureCollection<
        d3.ExtendedFeature<d3.GeoGeometryObjects | null, GeoJsonProperties>
      >
    | d3.ExtendedGeometryCollection<d3.GeoGeometryObjects>
) => {
  const projection = d3.geoMercator().fitSize([width, height], geojson)
  return d3.geoPath().projection(projection)
}

const Map = ({
  width = 600,
  height = 500,
}: {
  width?: number
  height?: number
}) => {
  const [paths, setPaths] = useState<
    { name: string; path: string; center: DOMPoint | undefined }[]
  >([])

  const navigate = useNavigate()

  useEffect(() => {
    const getPath = pathGenerator([width, height], typedGeojsonData)
    const _paths = typedGeojsonData.features
      .map((feature) => {
        const { properties, geometry } = feature

        // Ensure properties is not null
        if (!properties || !properties.name) {
          console.error("Invalid properties for feature:", feature)
          return null
        }

        const path = getPath(geometry)

        // Handle the case where path might be null
        if (!path) {
          console.error("Failed to generate path for:", properties.name)
          return null
        }

        const d3path = d3.select(
          document.createElementNS("http://www.w3.org/2000/svg", "path")
        )
        d3path.attr("d", path)

        const pathLength = d3path.node()?.getTotalLength()
        const center = d3path.node()?.getPointAtLength(pathLength! / 2)

        return { name: properties.name, path, center }
      })
      .filter((item) => item !== null && item.path !== null) as {
      name: string
      path: string
      center: DOMPoint | undefined
    }[]

    // Set the paths to state
    setPaths(_paths)
  }, [width, height])

  const handleStateClick = (stateName: string) => {
    navigate(`/properties/state/${stateName}`)
  }

  return (
    <Box
      as="svg"
      width={width}
      height={height}
      preserveAspectRatio="xMidYMid meet"
    >
      {paths.map(({ name, path }) => (
        <Box
          as="path"
          key={name} // Ensure this key is unique
          d={path}
          id={name}
          fill="#E1ECE8"
          stroke="#071655"
          _hover={{ opacity: 0.8, fill: "#57C7A1" }}
          _active={{ opacity: 0.8 }}
          cursor="pointer"
          onClick={() => handleStateClick(name)}
        />
      ))}
    </Box>
  )
}

export default Map
