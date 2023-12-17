import { Country } from "@/interfaces";

interface Props {
  countries: Country[];
}

export const CountryOptions = ({countries}: Props) => {

  return (
    <>
      <option value="">[Select]</option>
      {
        countries.map(({id, name}) => (
          <option key={id} value={id}>{name}</option>  
        ))
      }
    </>
  )
}
