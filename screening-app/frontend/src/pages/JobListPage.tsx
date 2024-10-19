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
  const [searchQuery, setSearchQuery] = useState<string>(''); // state to store search input
  const [filteredJobs, setFilteredJobs] = useState<Jobs[] | null>(null); // null means no filtering

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

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle search button click to filter jobs
  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      setFilteredJobs(null); // Show all jobs if search query is empty
    } else {
      const filtered = jobs.filter(job => 
        job.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredJobs(filtered);
    }
  };

  const jobsToDisplay = filteredJobs === null ? jobs : filteredJobs;

  return (
    <Container>
      <div>
        <Form className="d-flex w-100" onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
          <Form.Control
            type="search"
            placeholder="Search Job"
            className="me-2 flex-grow"
            aria-label="Search"
            style={{ width: '100%' }}
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <Button variant="outline-primary" onClick={handleSearch}>Search</Button>
        </Form>
      </div>

      <div>
        {jobsToDisplay.length > 0 ? (
          jobsToDisplay.map(job => (
            <CardWrapper key={job.id} className="col-md-4">
              <JobCards 
                id={job.id}
                title={job.title}
                description={job.description}
                details={job.details}
                applyLink={`/jobs/${job.id}`}
              />
            </CardWrapper>
          ))
        ) : (
          <p>No jobs found.</p>
        )}
      </div>
    </Container>
  );
};

const Container = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2%;
`;

const CardWrapper = styled.div`
  margin: 5px;
  padding: 12px;
  width: 100%;
`;
