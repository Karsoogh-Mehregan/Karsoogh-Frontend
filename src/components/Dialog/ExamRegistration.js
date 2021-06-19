import {
  Button,
  Dialog,
  Grid,
  makeStyles,
  Typography,
  Checkbox,
} from '@material-ui/core';
import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react';
import TinyPreview from '../tiny_editor/react_tiny/Preview';
import dateFormatter from '../../utils/dateFormatter';
import { toPersianNumber } from '../../utils/translateNumber';
import { doPayment } from '../../redux/actions/account'
import { registerInExam } from '../../redux/actions/exam';


const useStyles = makeStyles((theme) => ({
  dialog: {
    overflowX: 'hidden',
  },
  container: {
    padding: theme.spacing(2),
  },
}));

function Description({
  doPayment,
  registerInExam,
  open,
  handleClose,
  deadline,
  title,
  examId,
  description,
  cost = 0,
}) {

  const classes = useStyles();
  const [check, setCheck] = useState(false);
  const [descriptionComponent, _] = useState(
    <TinyPreview
      frameProps={{
        frameBorder: '0',
        scrolling: 'no',
        width: '100%',
      }}
      content={description} />);


  const register = () => {
    if (cost == 0) {
      registerInExam({ exam_id: examId }).then(() => {
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      })
    } else {
      doPayment({ amount: cost, exam_id: examId });
    }

  }

  return (
    <Dialog maxWidth="sm" fullWidth open={open} onClose={handleClose} >
      <div className={classes.dialog}>
        <Grid container justify='center' alignItems='center' className={classes.container} spacing={4}>
          <Grid item container alignItems='center' spacing={2} xs={12}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h3" align="center">
                {`ثبت‌نام در ${title}`}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} direction='column'>
              {deadline &&
                <Grid item>
                  <li>
                    <Typography variant="subtitle" align="center">
                      {`مهلت ثبت‌نام تا ${dateFormatter({ date: deadline, format: 'DD MMMM YYYY', })}`}
                    </Typography>
                  </li>
                </Grid>
              }
              <Grid item>
                <li>
                  <Typography variant="subtitle" align="center">
                    {`قیمت: ${cost ? toPersianNumber(cost / 10) + ' تومان' : 'رایگان'}`}
                  </Typography>
                </li>
              </Grid>
            </Grid>

          </Grid >
          <Grid item xs={12}>
            {descriptionComponent}
          </Grid>
          <Grid item xs={12} container spacing={1}>
            <Grid item xs={12} sm={8} alignItems='center' container>
              <Typography variant='subtitle'>
                <Checkbox onClick={() => setCheck(!check)} />
                {'توضیحات رو خوندم و متوجه شدم!'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} container justify='center' alignItems='center'>
              <Button disabled={!check} fullWidth variant='contained' color='primary' onClick={register}>
                {'ثبت‌نام'}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Dialog >
  );
}


const mapStateToProps = (state, ownProps) => {
  const {
    open,
    handleClose,
    deadline,
    title,
    examId,
    description,
    cost } = ownProps;
  return ({
    open,
    handleClose,
    deadline,
    title,
    examId,
    description,
    cost
  })
}

export default connect(mapStateToProps, { doPayment, registerInExam })(Description);