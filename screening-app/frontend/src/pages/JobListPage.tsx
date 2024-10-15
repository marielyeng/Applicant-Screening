import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { JobCards } from '../components/JobCards';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
interface Jobs {
    id: string;
    title: string;
    description: string;
    details: string;
    link: string;
}

export const JobListPage: React.FC = () => {
  const [jobs, setJobs] = useState<Jobs[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/get-jobs');
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching job posts', error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <Container>
      <div>
      <Form className="d-flex w-100">
              <Form.Control
                type="search"
                placeholder="Search Job"
                className="me-2 flex-grow"
                aria-label="Search"
                style={{ width: '92%', justifySelf: 'center' }}
              />
              <Button variant="outline-primary">Search</Button>
        </Form>

        {jobs.map(job => (
          <CardWrapper key={job.id} className="col-md-4">
            <JobCards 
              id={job.id}
              title={job.title}
              description={job.description}
              details={job.details}
              applyLink={`/jobs/${job.id}`}
            />
          </CardWrapper>
        ))}
      </div>
    </Container>
  );
};

const Container = styled.div`
  padding: 24px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10%;
`;

const CardWrapper = styled.div`
 margin: 5px;
 padding: 12px;
 width: 100%;
`;