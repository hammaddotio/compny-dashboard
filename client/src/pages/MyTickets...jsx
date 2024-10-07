import React, { useState } from 'react'
import Main from '../components/layout/Main'
import CreateTicketModal from '../components/CreateTicketModal';
import TicketsTable from '../components/MyTickets';
import ChatBox from '../components/ChatBox';
import axios from 'axios';
import { authHeaders, GET_USER_TICKETS_API, URL } from '../constant';

const MyTickets = () => {
    const [tickets, setTickets] = useState([])

    const userTickets = async () => {
        try {
            const response = await axios.get(
                `${URL}${GET_USER_TICKETS_API}/`,
                authHeaders
            );
            const tickets = response.data;
            setTickets(tickets);
        } catch (error) {
            console.log("Error fetching tickets:", error);
        }
    };

    return (
        <Main >
            <div className='mb-4'>
                <CreateTicketModal userTicketsCall={userTickets} />
            </div>
            {/* <ChatBox /> */}

            <TicketsTable tickets={tickets} setTickets={setTickets} userTicketsCall={userTickets} />
            <ChatBox />

        </Main>
    )
}

export default MyTickets
