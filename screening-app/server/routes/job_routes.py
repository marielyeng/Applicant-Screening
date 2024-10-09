from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db
from models.job_model import Job

# Create a Blueprint for job-related routes
job_bp = Blueprint('job_bp', __name__)

# Route for Posting a Job
@job_bp.route('/post-job', methods=['POST'])
@jwt_required()
def post_job():
    data = request.json
    
    title = data.get('title')
    description = data.get('description')
    details = data.get('details')

    # Validate title and description
    if not title or not description:
        return jsonify({'error': 'Title and description are required'}), 400
    
    # Create new Job instance
    new_job = Job(title=title, description=description, details=details)
    
    # Add to database
    db.session.add(new_job)
    db.session.commit()
    
    # Return the new job details including the generated ID
    return jsonify({
        'message': 'Job posted successfully',
        'job': {
            'id': new_job.id,
            'title': new_job.title,
            'description': new_job.description,
            'details': new_job.details
        }
    }), 201

@job_bp.route('/get-jobs', methods=['GET'])
def get_jobs():
    try:
        # Fetch all job postings from the database
        jobs = Job.query.all()

        # Convert the jobs to a list of dictionaries to return as JSON
        jobs_list = []
        for job in jobs:
            jobs_list.append({
                'id': job.id,
                'title': job.title,
                'description': job.description,
                'details': job.details,
                'link': f'/job/{job.id}'  # Example link to individual job page
            })

        # Return the list of jobs as JSON
        return jsonify(jobs_list), 200

    except Exception as e:
        print(f"Error fetching jobs: {e}")
        return jsonify({'error': 'Error fetching job postings'}), 500

# Route to delete a job
@job_bp.route('/delete-job/<int:job_id>', methods=['DELETE'])
@jwt_required()
def delete_job(job_id):
    job = Job.query.get(job_id)
    if job is None:
        return jsonify({'error': 'Job not found'}), 404

    db.session.delete(job)
    db.session.commit()

    return jsonify({'message': 'Job deleted successfully'}), 200

@job_bp.route('/jobs/<int:job_id>', methods=['GET'])
def get_job_by_id(job_id):
    try:
        # Fetch the job by its ID
        job = Job.query.get(job_id)

        if not job:
            return jsonify({'error': 'Job not found'}), 404

        # Convert the job to a dictionary to return as JSON
        job_details = {
            'id': job.id,
            'title': job.title,
            'description': job.description,
            'details': job.details
        }

        # Return the job details as JSON
        return jsonify(job_details), 200

    except Exception as e:
        print(f"Error fetching job details: {e}")
        return jsonify({'error': 'Error fetching job details'}), 500
