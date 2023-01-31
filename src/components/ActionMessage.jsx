import React from 'react'
import styled from 'styled-components'
import theme from '../styles/theme'

const StyledActionMessage = styled.div`
	min-width: ${theme.minWidth};
	margin-top: ${theme.gap.md};
	background-color: ${theme.palette.blackStrong};
	box-shadow: ${theme.palette.blackStrong} 2px 5px 10px;
	border-radius: ${theme.roundedEdge};
	padding-inline: ${theme.gap.md};
	padding-block: ${theme.gap.sm};
	display: flex;
	align-items: center;

	.repeats {
		width: 25px;
		height: 25px;
		border-radius: 100%;
		background-color: ${theme.palette.accentSecondary};
		color: ${theme.palette.blackStrong};
		line-height: 25px;
		text-align: center;
		margin-right: ${theme.gap.sm};
	}

	.success,
	.error {
		font-size: 1.5rem;
		margin-right: ${theme.gap.xs};
		display: block;
		font-weight: bold;
	}

	.success {
		color: ${theme.palette.accentSecondary};
	}

	.error {
		color: crimson;
	}

	.message {
	}
`

const successMessage = ''

export const ActionMessage = ({ messageStatus }) => {
	return (
		<StyledActionMessage>
			{messageStatus.repeats > 0 && (
				<span className='repeats'>{messageStatus.repeats}</span>
			)}
			{messageStatus.isSuccess ? (
				<div>
					<span className='success'>Success!</span>
					<span className='message'>
						Clipboard was formatted without issue.
					</span>
				</div>
			) : (
				<div>
					<span className='error'>Error..</span>
					<span className='message'>Already formatted or clipboard empty.</span>
				</div>
			)}
		</StyledActionMessage>
	)
}
