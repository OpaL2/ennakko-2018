# API endpoints described

All endpoints descripted in this file are nested under /api endpoint.

## get /locations

Returns all locations data.

Response format:
```
{
  "locations":[
    {
      "id": int, 
      "name": string,
      "latitude": float,
      "longitude": float
    }
  ]
}
```

## get /measurements/:location_id/:page

Returns collection of measurements with given query parameters.
```

Responses with array of measurements:
Responese content:
```
{
  "location_id": int,
  "measurements":[
    {
      "time": string,
      "temperature": float,
      "id": int
    }
  ]
}
```

## get /measurements/latest/

Returns latest measurement for all locations and also highest and lowest measurement in last 24 hours.
```
{
  "measurements": [
    {
      "location_id": int,
      "latest": float,
      "highest": float,
      "lowest": float,
      "total": int
    }
  ]
}

```

## post /measurements

Generates new measurement point, takes in json object:
```
{
  "temperature": float,
  "location_id": int
}

```

Returns updated data in same format as get /measurements/latest request.