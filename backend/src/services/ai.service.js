// importing dependencis
const { GoogleGenAI } = require('@google/genai')
const { z } = require('zod')
const { zodToJsonSchema } = require('zod-to-json-schema')
const envConfig = require('../configs/env.config')

// making instance of ai
const ai = new GoogleGenAI({ apiKey: envConfig.GEMINI_API_KEY })

// making interview report schema
const interviewReportSchema = z.object({
	matchScore: z
		.number()
		.describe(
			"A score between 0 to 100 indicating how well the candidate's profile matches the job description",
		),
	technicalQuestions: z
		.array(
			z.object({
				question: z
					.string()
					.describe(
						'The technical question that can be asked in interview.',
					),
				intention: z
					.string()
					.describe(
						'The intention of interviewer behind asking this question.',
					),
				answer: z
					.string()
					.describe(
						'How to answer this question, what points to cover, what approach to take etc.',
					),
			}),
		)
		.describe(
			'Technical questions that can be asked in the interview along with their intention and how to answer them',
		),
	behavioralQuestions: z
		.array(
			z.object({
				question: z
					.string()
					.describe(
						'The behavioral question that can be asked in interview.',
					),
				intention: z
					.string()
					.describe(
						'The intention of interviewer behind asking this question.',
					),
				answer: z
					.string()
					.describe(
						'How to answer this question, what points to cover, what approach to take etc.',
					),
			}),
		)
		.describe(
			'Behavioral questions that can be asked in the interview along with their intention and how to answer them',
		),
	skillGaps: z
		.array(
			z.object({
				skill: z
					.string()
					.describe('The skill which the candidate is lacking'),
				priority: z
					.enum(['low', 'medium', 'high'])
					.describe(
						'How important it is for the candidate to improve this skill to better match the target job role.',
					),
				severity: z
					.enum(['low', 'medium', 'high'])
					.describe(
						"The extent of the candidate's deficiency in this skill based on the resume and overall qualifications.",
					),
			}),
		)
		.describe(
			"List of skill gaps in the candidate's profile along with their priority and severity",
		),
	preparationPlan: z
		.array(
			z.object({
				day: z
					.number()
					.describe(
						'The day number in the preparation plan, starting from 1',
					),
				focus: z
					.string()
					.describe(
						'The main focus of this day in the preparation plan, e.g. data strucutres, system design, mock interviews etc',
					),
				tasks: z
					.array(z.string())
					.describe(
						'List of tasks to be done on this day to follow the preparation plan, e.g. read a spcific book, practice a particular topic or make a spcific project',
					),
			}),
		)
		.describe(
			'A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively',
		),
})

// function for generate interview report with geminiAi
async function generateInterviewReport({
	resume,
	selfDescription,
	jobDescription,
}) {
	// making prompt for ai as instructions
	const prompt = `You are an experienced Senior Technical Recruiter, Engineering Manager, and for now mainly an serious Interview Coach.

    Your task is to analyze the candidate's resume, self-description, and target job description to generate a comprehensive interview preparation report with following details:

    ## Candidate Resume
    ${resume}

    ## Candidate Self Description
    ${selfDescription || 'Not provided'}

    ## Target Job Description
    ${jobDescription}

    ## Instructions

    Evaluate the candidate against the target job requirements and produce an objective, professional assessment.

    ### Match Score
    - Return a score between 0 and 100.
    - Base the score on skills, experience, projects, technologies, and overall relevance to the job.
    - Do not inflate the score.

    ### Technical Interview Questions
    Generate practical technical questions that are likely to be asked for this role.
    For each question:
    - Write a realistic interviewer question.
    - Explain why the interviewer is asking it.
    - Provide a detailed answer guide covering the expected concepts, approach, and key discussion points.

    Generate 5-8 questions.

    ### Behavioral Interview Questions
    Generate behavioral questions relevant to the role and seniority.
    For each question:
    - Write the question.
    - Explain the interviewer's intention.
    - Provide guidance using structured storytelling (prefer STAR where appropriate).

    Generate 4-6 questions.

    ### Skill Gaps
    Identify only genuine missing or weak skills by comparing the resume with the job description.
    For each skill:
    - Skill name
    - Priority (low | medium | high)
    - Severity (low | medium | high)

    Do not invent missing skills that are unsupported by the resume or job description.

    ### Preparation Plan
    Create a practical 7-day interview preparation plan.
    Each day should include:
    - One clear learning focus
    - 3-5 actionable tasks
    - Tasks should be specific, measurable, and directly related to the target role.

    ## Important Rules
    - Be objective and evidence-based.
    - Do not fabricate experience or achievements.
    - Tailor every section to the provided job description.
    - Use easy and understandable English language.
    - Return ONLY valid JSON matching the required schema.`

	// invokeing ai to generate response
	const response = await ai.models.generateContent({
		model: 'gemini-2.5-flash',
		contents: prompt,
		config: {
			responseMimeType: 'application/json',
			responseSchema: zodToJsonSchema(interviewReportSchema),
		},
	})

	// returning generated response
	return JSON.parse(response.text)
}

// exporting function
module.exports = generateInterviewReport