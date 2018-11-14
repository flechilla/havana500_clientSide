import {
  sequence,
  trigger,
  animate,
  style,
  group,
  query,
  transition,
  animateChild,
  state,
  animation,
  useAnimation,
  stagger,
  keyframes
} from '@angular/animations';

const customAnimation = animation(
  [
    style({
      opacity: '{{opacity}}',
      transform: 'scale({{scale}}) translate3d({{x}}, {{y}}, {{z}})'
    }),
    animate('{{duration}} {{delay}} cubic-bezier(0.0, 0.0, 0.2, 1)', style('*'))
  ],
  {
    params: {
      duration: '200ms',
      delay: '0ms',
      opacity: '0',
      scale: '1',
      x: '0',
      y: '0',
      z: '0'
    }
  }
);

export const antAnimations = [
  trigger('animate', [
    transition('void => *', [useAnimation(customAnimation)])
  ]),
  trigger('animateStagger', [
    state('50', style('*')),
    state('100', style('*')),
    state('200', style('*')),

    transition(
      'void => 50',
      query('@*', [stagger('50ms', [animateChild()])], {
        optional: true
      })
    ),
    transition(
      'void => 100',
      query('@*', [stagger('100ms', [animateChild()])], {
        optional: true
      })
    ),
    transition(
      'void => 200',
      query('@*', [stagger('200ms', [animateChild()])], {
        optional: true
      })
    )
  ]),
  trigger('fadeInOut', [
    state(
      'invisible',
      style({
        display: 'none',
        opacity: 0
      })
    ),
    state(
      'visible',
      style({
        display: 'block',
        opacity: 1
      })
    ),
    transition('visible => invisible', animate('0ms  ease-in')),
    transition('invisible => visible', animate('1500ms ease-out'))
  ]),
  trigger('slideInOut', [
    state(
      '0',
      style({
        height: '0px',
        display: 'none'
      })
    ),
    state(
      '1',
      style({
        height: '*',
        display: 'block'
      })
    ),
    transition('1 => 0', animate('300ms ease-out')),
    transition('0 => 1', animate('300ms ease-in'))
  ]),
  trigger('slideIn', [
    transition('void => left', [
      style({
        transform: 'translateX(100%)'
      }),
      animate(
        '300ms ease-in',
        style({
          transform: 'translateX(0)'
        })
      )
    ]),
    transition('left => void', [
      style({
        transform: 'translateX(0)'
      }),
      animate(
        '300ms ease-in',
        style({
          transform: 'translateX(-100%)'
        })
      )
    ]),
    transition('void => right', [
      style({
        transform: 'translateX(-100%)'
      }),
      animate(
        '300ms ease-in',
        style({
          transform: 'translateX(0)'
        })
      )
    ]),
    transition('right => void', [
      style({
        transform: 'translateX(0)'
      }),
      animate(
        '300ms ease-in',
        style({
          transform: 'translateX(100%)'
        })
      )
    ])
  ]),
  trigger('slideInLeft', [
    state(
      'void',
      style({
        transform: 'translateX(-100)'
        // display: 'none'
      })
    ),
    state(
      '*',
      style({
        transform: 'translateX(0)'
        // display: 'flex'
      })
    ),
    transition('void => *', animate('300ms')),
    transition('* => void', animate('300ms'))
  ]),
  trigger('rotateIn', [
    transition(':enter', [
      animate(
        '800ms ease-in',
        keyframes([
          style({
            offset: 0,
            transform: 'rotateY(0deg)'
            // display: 'none'
          }),
          style({
            offset: 0.5,
            transform: 'rotateY(180deg)'
            // display: 'initial'
          }),
          style({
            offset: 1,
            transform: 'rotateY(360deg)'
          })
        ])
      )
    ])
  ]),
  trigger('rotateOut', [
    transition(':leave', [
      animate(
        '800ms ease-in',
        keyframes([
          style({
            offset: 0,
            transform: 'rotateY(0deg)'
            // display: 'none'
          }),
          style({
            offset: 0.5,
            transform: 'rotateY(180deg)'
            // display: 'initial'
          }),
          style({
            offset: 1,
            transform: 'rotateY(360deg)',
            opacity: '0'
          })
        ])
      )
    ])
  ]),
  trigger('enterRightLeaveLeft', [
    transition(':enter', [
      animate(
        '400ms ease-in',
        keyframes([
          style({
            offset: 0,
            transform: 'translateX(200%)',
            display: 'none'
          }),
          style({
            offset: 0,
            transform: 'translateX(200%)',
            display: 'none'
          }),
          style({
            offset: 1,
            transform: 'translateX(0%)',
            display: 'initial'
          })
        ])
      )
    ]),
    transition(':leave', [
      animate(
        '400ms  ease-in-out',
        keyframes([
          style({
            offset: 0,
            transform: 'translateX(0%)',
            display: 'initial'
          }),
          style({
            offset: 0.9,
            transform: 'translateX(-200%)'
          }),
          style({
            offset: 1,
            display: 'none'
          })
        ])
      )
    ])
  ]),
  trigger('slideInRight', [
    state(
      'void',
      style({
        transform: 'translateX(200%)',
        display: 'none'
      })
    ),
    state(
      '*',
      style({
        transform: 'translateX(0)',
        display: 'initial'
      })
    ),
    transition('void => *', animate('400ms 400ms ease-in')),
    transition('* => void', animate('0ms'))
  ]),
  trigger('slideInTop', [
    state(
      'void',
      style({
        transform: 'translateY(-100%)',
        display: 'none'
      })
    ),
    state(
      '*',
      style({
        transform: 'translateY(0)',
        display: 'flex'
      })
    ),
    transition('void => *', animate('300ms')),
    transition('* => void', animate('300ms'))
  ]),
  trigger('slideInBottom', [
    state(
      'void',
      style({
        transform: 'translateY(100%)',
        display: 'none'
      })
    ),
    state(
      '*',
      style({
        transform: 'translateY(0)',
        display: 'flex'
      })
    ),
    transition('void => *', animate('300ms')),
    transition('* => void', animate('300ms'))
  ]),
  trigger('expandCollapse', [
    state(
      'void',
      style({
        height: '0px'
      })
    ),
    state(
      '*',
      style({
        height: '*'
      })
    ),
    transition('void => *', animate('300ms ease-out')),
    transition('* => void', animate('300ms ease-in'))
  ]),
  trigger('routerTransitionLeft', [
    transition('* => *', [
      query(
        'ant-content > :enter, ant-content > :leave',
        [
          style({
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
          })
        ],
        { optional: true }
      ),
      query(
        'ant-content > :enter',
        [
          style({
            transform: 'translateX(100%)',
            opacity: 0
          })
        ],
        { optional: true }
      ),
      sequence([
        group([
          query(
            'ant-content > :leave',
            [
              style({
                transform: 'translateX(0)',
                opacity: 1
              }),
              animate(
                '600ms cubic-bezier(0.0, 0.0, 0.2, 1)',
                style({
                  transform: 'translateX(-100%)',
                  opacity: 0
                })
              )
            ],
            { optional: true }
          ),
          query(
            'ant-content > :enter',
            [
              style({ transform: 'translateX(100%)' }),
              animate(
                '600ms cubic-bezier(0.0, 0.0, 0.2, 1)',
                style({
                  transform: 'translateX(0%)',
                  opacity: 1
                })
              )
            ],
            { optional: true }
          )
        ]),
        query('ant-content > :leave', animateChild(), {
          optional: true
        }),
        query('ant-content > :enter', animateChild(), {
          optional: true
        })
      ])
    ])
  ]),
  trigger('routerTransitionRight', [
    transition('* => *', [
      query(
        'ant-content > :enter, ant-content > :leave',
        [
          style({
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
          })
        ],
        { optional: true }
      ),
      query(
        'ant-content > :enter',
        [
          style({
            transform: 'translateX(-100%)',
            opacity: 0
          })
        ],
        { optional: true }
      ),
      sequence([
        group([
          query(
            'ant-content > :leave',
            [
              style({
                transform: 'translateX(0)',
                opacity: 1
              }),
              animate(
                '600ms cubic-bezier(0.0, 0.0, 0.2, 1)',
                style({
                  transform: 'translateX(100%)',
                  opacity: 0
                })
              )
            ],
            { optional: true }
          ),
          query(
            'ant-content > :enter',
            [
              style({ transform: 'translateX(-100%)' }),
              animate(
                '600ms cubic-bezier(0.0, 0.0, 0.2, 1)',
                style({
                  transform: 'translateX(0%)',
                  opacity: 1
                })
              )
            ],
            { optional: true }
          )
        ]),
        query('ant-content > :leave', animateChild(), {
          optional: true
        }),
        query('ant-content > :enter', animateChild(), {
          optional: true
        })
      ])
    ])
  ]),
  trigger('routerTransitionUp', [
    transition('* => *', [
      query(
        'ant-content > :enter, ant-content > :leave',
        [
          style({
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
          })
        ],
        { optional: true }
      ),
      query(
        'ant-content > :enter',
        [
          style({
            transform: 'translateY(100%)',
            opacity: 0
          })
        ],
        { optional: true }
      ),
      group([
        query(
          'ant-content > :leave',
          [
            style({
              transform: 'translateY(0)',
              opacity: 1
            }),
            animate(
              '600ms cubic-bezier(0.0, 0.0, 0.2, 1)',
              style({
                transform: 'translateY(-100%)',
                opacity: 0
              })
            )
          ],
          { optional: true }
        ),
        query(
          'ant-content > :enter',
          [
            style({ transform: 'translateY(100%)' }),
            animate(
              '600ms cubic-bezier(0.0, 0.0, 0.2, 1)',
              style({
                transform: 'translateY(0%)',
                opacity: 1
              })
            )
          ],
          { optional: true }
        )
      ]),
      query('ant-content > :leave', animateChild(), {
        optional: true
      }),
      query('ant-content > :enter', animateChild(), {
        optional: true
      })
    ])
  ]),
  trigger('routerTransitionDown', [
    transition('* => *', [
      query(
        'ant-content > :enter, ant-content > :leave',
        [
          style({
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
          })
        ],
        { optional: true }
      ),
      query(
        'ant-content > :enter',
        [
          style({
            transform: 'translateY(-100%)',
            opacity: 0
          })
        ],
        { optional: true }
      ),
      sequence([
        group([
          query(
            'ant-content > :leave',
            [
              style({
                transform: 'translateY(0)',
                opacity: 1
              }),
              animate(
                '600ms cubic-bezier(0.0, 0.0, 0.2, 1)',
                style({
                  transform: 'translateY(100%)',
                  opacity: 0
                })
              )
            ],
            { optional: true }
          ),
          query(
            'ant-content > :enter',
            [
              style({ transform: 'translateY(-100%)' }),
              animate(
                '600ms cubic-bezier(0.0, 0.0, 0.2, 1)',
                style({
                  transform: 'translateY(0%)',
                  opacity: 1
                })
              )
            ],
            { optional: true }
          )
        ]),
        query('ant-content > :leave', animateChild(), {
          optional: true
        }),
        query('ant-content > :enter', animateChild(), {
          optional: true
        })
      ])
    ])
  ]),
  trigger('routerTransitionFade', [
    transition(
      '* => *',
      group([
        query(
          'ant-content > :enter, ant-content > :leave ',
          [
            style({
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0
            })
          ],
          { optional: true }
        ),

        query(
          'ant-content > :enter',
          [
            style({
              opacity: 0
            })
          ],
          { optional: true }
        ),
        query(
          'ant-content > :leave',
          [
            style({
              opacity: 1
            }),
            animate(
              '300ms cubic-bezier(0.0, 0.0, 0.2, 1)',
              style({
                opacity: 0
              })
            )
          ],
          { optional: true }
        ),
        query(
          'ant-content > :enter',
          [
            style({
              opacity: 0
            }),
            animate(
              '300ms cubic-bezier(0.0, 0.0, 0.2, 1)',
              style({
                opacity: 1
              })
            )
          ],
          { optional: true }
        ),
        query('ant-content > :enter', animateChild(), {
          optional: true
        }),
        query('ant-content > :leave', animateChild(), {
          optional: true
        })
      ])
    )
  ])
];
