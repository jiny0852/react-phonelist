//import 라이브러리

import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


import ItemPerson from './ItemPerson';





const List = () => {

    const [personList, setPersonList] = useState([]);

    const getPersonList = ()=>{
        axios({

            method: 'get',
            url: `${process.env.REACT_APP_API_URL}/api/persons`,

            responseType: 'json' 
        }).then(response => {
            console.log(response.data); 
            
            setPersonList(response.data.apiData);

            

        }).catch(error => {
            console.log(error);

        });


    }


    useEffect( ()=>{

        console.log("마운트 온");

        getPersonList();


    }, [] );


    
    const handleDel = (no) => {
        console.log('삭제버튼 클릭');

        axios({

            method: 'delete',
            url: `${process.env.REACT_APP_API_URL}/api/persons/${no}`,

            responseType: 'json' 

        }).then(response => {
            console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
            console.log(response.data); 
            console.log(response);
            console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");


            if ( response.data.result === 'success' ) {
                
                let newArray = personList.filter( (person)=>(person.personId !== no) );
                
                setPersonList( newArray );



            } else {
                alert(response.data.message);
            }
            
            

        }).catch(error => {
            console.log(error);

        });

    };






    return (

        <>

            <h1>전화번호부</h1>

            <h2>전화번호-리스트</h2>

            <p>등록된 전화번호 리스트 입니다.</p>

            { personList.map ( ( personVo )=>   {
                return( 
                    <div >
                        
                        <ItemPerson key={personVo.personId} 
                                    person = {personVo} 
                                    delPerson={handleDel}  
                        />

                    </div>
              )   }) }



            <br />
			<Link to="/writeform" rel="noreferrer noopener">등록폼으로 이동</Link>
            <br /><br /><br /><br /><br />

        </>

    );

}

export default List;