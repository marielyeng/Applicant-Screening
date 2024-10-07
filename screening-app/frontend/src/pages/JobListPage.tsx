import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { JobCards } from '../components/JobCards';

interface Jobs {
    id: string;
    title: string;
    description: string;
    details: string;
    link: string;
}

const JobListPage: React.FC = () => {
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
    <div className="container mt-5">
      <h2>Available Jobs</h2>
      <div className="row">
        {jobs.map(job => (
          <div key={job.id} className="col-md-4">
            <JobCards 
              id={job.id}
              title={job.title}
              description={job.description}
              details={job.details}
              link={`/jobs/${job.id}`}  // Link to a detailed page or external application
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobListPage;
