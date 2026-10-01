/*
    - file name: ai.service.js
    - responsibility: responsible for ai services
 */

// importing dependencis
const { GoogleGenAI } = require('@google/genai')
const z = require('zod')
const envConfig = require('../configs/env.config')

// making interview report json schema
const interviewReportJsonSchema = {
	type: 'object',
	properties: {
		jobTitle: {
			type: 'string',
			description:
				'The title of the job for which the interview report is generated',
		},
		matchScore: {
			type: 'integer',
			description:
				"A score between 0 to 100 indicating how well the candidate's profile matches the job description",
		},
		technicalQuestions: {
			type: 'array',
			description:
				'Technical questions that can be asked in the interview along with their intention and how to answer them',
			items: {
				type: 'object',
				properties: {
					question: {
						type: 'string',
						description:
							'The technical question that can be asked in interview.',
					},
					intention: {
						type: 'string',
						description:
							'The intention of interviewer behind asking this question.',
					},
					answer: {
						type: 'string',
						description:
							'How to answer this question, what points to cover, what approach to take etc.',
					},
				},
				required: ['question', 'intention', 'answer'],
			},
		},
		behavioralQuestions: {
			type: 'array',
			description:
				'Behavioral questions that can be asked in the interview along with their intention and how to answer them',
			items: {
				type: 'object',
				properties: {
					question: {
						type: 'string',
						description:
							'The behavioral question that can be asked in interview.',
					},
					intention: {
						type: 'string',
						description:
							'The intention of interviewer behind asking this question.',
					},
					answer: {
						type: 'string',
						description:
							'How to answer this question, what points to cover, what approach to take etc.',
					},
				},
				required: ['question', 'intention', 'answer'],
			},
		},
		skillGaps: {
			type: 'array',
			description:
				"List of skill gaps in the candidate's profile along with their priority and severity",
			items: {
				type: 'object',
				properties: {
					skill: {
						type: 'string',
						description: 'The skill which the candidate is lacking',
					},
					priority: {
						type: 'string',
						enum: ['low', 'medium', 'high'],
						description:
							'How important it is for the candidate to improve this skill to better match the target job role.',
					},
					severity: {
						type: 'string',
						enum: ['low', 'medium', 'high'],
						description:
							"The extent of the candidate's deficiency in this skill based on the resume and overall qualifications.",
					},
				},
				required: ['skill', 'priority', 'severity'],
			},
		},
		preparationPlan: {
			type: 'array',
			description:
				'A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively',
			items: {
				type: 'object',
				properties: {
					day: {
						type: 'integer',
						description:
							'The day number in the preparation plan, starting from 1',
					},
					focus: {
						type: 'string',
						description:
							'The main focus of this day in the preparation plan, e.g. data strucutres, system design, mock interviews etc',
					},
					tasks: {
						type: 'array',
						items: { type: 'string' },
						description:
							'List of tasks to be done on this day to follow the preparation plan, e.g. read a spcific book, practice a particular topic or make a spcific project',
					},
				},
				required: ['day', 'focus', 'tasks'],
			},
		},
	},
	required: [
		'jobTitle',
		'matchScore',
		'technicalQuestions',
		'behavioralQuestions',
		'skillGaps',
		'preparationPlan',
	],
}

// making interview report schema
const interviewReportSchema = z.fromJSONSchema(interviewReportJsonSchema)

// making instance of ai
const ai = new GoogleGenAI({ apiKey: envConfig.GEMINI_API_KEY })

// function for generate interview report with geminiAi
async function generateInterviewReport({
	resume,
	selfDescription,
	jobDescription,
}) {
	// making prompt for ai as instructions
	const prompt = `Generate an interview report for a candidate with the following details: 
					Resume: ${resume}
					Self Description: ${selfDescription}
					Job Description: ${jobDescription}`

	// invokeing ai to generate response
	const response = await ai.interactions.create({
		model: 'gemini-3.8-flash',
		input: prompt,
		response_format: {
			type: 'text',
			mime_type: 'application/json',
			schema: interviewReportJsonSchema,
		},
	})

	// getting ai returned response in readable text format
	const interviewReport = interviewReportSchema.parse(
		JSON.parse(response.output_text),
	)

	// returning generated interview report
	console.log(interviewReport)
	return interviewReport
}

// exporting function
module.exports = generateInterviewReport