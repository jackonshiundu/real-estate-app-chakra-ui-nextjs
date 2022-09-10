import React from 'react';
import Link from 'next/link'
import Image from 'next/image'
import {Flex, Box,Text,Button} from '@chakra-ui/react'
import Property from '../components/Property'
import {baseUrl,fetchApi} from '../utils/fetchApi'
const Banner=({purpose,title2,title1,desc1,desc2,buttonText,linkName,imageUrl})=>(
  <Flex position="relative"  left="-20"  width="109%"bg="green.200" boxShadow="md"  justifyContent="center" alignItems="center" marginBottom="10">
    <Image src={imageUrl} alt='Banner' width={500} height={300}/>
    <Box p="5">
      <Text color="white" fontSize="sm" fontWeight="medium">{purpose}</Text>
      <Text  fontSize="3xl" fontWeight="bold">{title1} <br/> {title2}</Text>
      <Text fontSize="lg" paddingTop="3" paddindBottom="3" color="gray.700">{desc1}<br/>{desc2}</Text>
      <Button fontSize="xl" bg='blue.300' color="white">
        <Link href={linkName}>{buttonText}</Link>
      </Button>
    </Box>
  </Flex> 
)

export default function Home({propertiesForRent,propertiesForSale }) {
  console.log(propertiesForRent,propertiesForSale)
  return (
    <div >
     <Banner 
      purpose={'RENT A HOME'}
      title1="Rental Homes for"
      title2="Everyone"
      desc1="Explore Apartments,villas,Homes"
      buttonText="Explore Renting"
      linkName="/search?purpose=for-rent"
      imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
     />
     <Flex flexWrap="wrap">
      {
        propertiesForRent.map((property)=><Property property={property} key={property.id}/>)
      }
     </Flex>
   <Banner
      purpose='BUY A HOME'
      title1=' Find, Buy & Own Your'
      title2='Dream Home'
      desc1=' Explore from Apartments, land, builder floors,'
      desc2=' villas and more'
      buttonText='Explore Buying'
      linkName='/search?purpose=for-sale'
      imageUrl='https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008'
    />
    <Flex flexWrap="wrap">
      {
        propertiesForSale.map((property)=><Property property={property} key={property.id}/>)
      } 
    </Flex>
    </div >  
  )
} 

export async function getStaticProps() {
  const propertyForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=9`);
  const propertyForRent = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=9`);

  return{
    props:{
      propertiesForRent: propertyForRent?.hits,
      propertiesForSale: propertyForSale?.hits,
    }
  }
}
