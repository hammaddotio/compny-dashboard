import React, { useState } from 'react'
import Main from '../components/layout/Main'
import CreateTicketModal from './../components/CreateTicketModal';
import TicketsTable from './../components/TicketsTable';
import ChatBox from '../components/ChatBox';

const UserDashboard = () => {
    const [tickets, setTickets] = useState([])

    return (
        <Main>
            <div className='mb-4'>
                <CreateTicketModal />
            </div>
            {/* <ChatBox /> */}

            <TicketsTable tickets={tickets} setTickets={setTickets} />
            <ChatBox />

        </Main>
    )
}

export default UserDashboard
