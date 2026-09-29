/**
	- file name: interviewReport.model.js
	- responsibility: responsible for interviewReport schema & model design
 */

// importing dependencis
const { Schema, model } = require('mongoose')

// technicalQuestion - sub schema
const technicalQuestionSchema = new Schema(
	{
		question: {
			type: String,
			required: [true, 'Technical question is required'],
		},
		intention: {
			type: String,
			required: [true, 'Intention is required'],
		},
		answer: {
			type: String,
			required: [true, 'Answer is required'],
		},
	},
	{ _id: false },
)

// behavioralQuestion - sub schema
const behavioralQuestionSchema = new Schema(
	{
		question: {
			type: String,
			required: [true, 'Technical question is required'],
		},
		intention: {
			type: String,
			required: [true, 'Intention is required'],
		},
		answer: {
			type: String,
			required: [true, 'Answer is required'],
		},
	},
	{ _id: false },
)

// skillGap - sub schema
const skillGapSchema = new Schema(
	{
		skill: {
			type: String,
			required: [true, 'Skill is required'],
		},
		priority: {
			type: String,
			enum: ['low', 'medium', 'high'],
			required: [true, 'Priority is required'],
		},
		severity: {
			type: String,
			enum: ['low', 'medium', 'high'],
			required: [true, 'Severity is required'],
		},
	},
	{ _id: false },
)

// preparationPlan - sub schema
const preparationPlanSchema = new Schema(
	{
		day: {
			type: Number,
			required: [true, 'Day is required'],
		},
		focus: {
			type: String,
			required: [true, 'Focus is required'],
		},
		tasks: [
			{
				type: String,
				required: [true, 'Task is required'],
			},
		],
	},
	{ _id: false },
)

// making schema
const interviewReportSchema = new Schema(
	{
		jobDescription: {
			type: String,
			required: [true, 'Job description is required'],
		},
		resume: String,
		selfDescription: String,
		matchScore: {
			type: Number,
			min: 0,
			max: 100,
		},
		technicalQuestions: [technicalQuestionSchema],
		behavioralQuestions: [behavioralQuestionSchema],
		skillGaps: [skillGapSchema],
		preparationPlan: [preparationPlanSchema],
	},
	{ timestamps: true },
)

// making model
const interviewReportModel = model('interviewReport', interviewReportSchema)

// exporting model
module.exports = interviewReportModel