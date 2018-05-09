/**
 * @file mofron-comp-tab/index.js
 * @brief tab component for mofron
 * @author simpart
 */
let mf = require('mofron');
let Text = require('mofron-comp-text');
let Frame = require('mofron-comp-frame');
let Click = require('mofron-event-click');
let efCenter = require('mofron-effect-center');

mofron.comp.Tab = class extends mf.Component {
    
    constructor (po) {
        try {
            super();
            this.name('Tab');
            this.prmOpt(po);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    initDomConts (prm) {
        try {
            super.initDomConts();
            
            /* set index */
            let idx_ara = new mf.Component({
                style : { 'display' : 'flex' },
                addChild : new Frame({
                    style : {
                        'border-top-width'   : '0px',
                        'border-left-width'  : '0px',
                        'border-right-width' : '0px'
                    },
                    size : new mf.Param('100%', 46)
                })
            });
            this.addChild(
                new mf.Component({
                    addChild : idx_ara
                })
            );
            
            let tgt_buf = this.target();
            this.target(idx_ara.target());
            
            if (undefined !== prm) {
                this.index(prm);
            } else {
                /* default index */
                this.addIndex("");
            }
             
            /* set contents */
            this.target(tgt_buf);
            let cnt_ara = new mf.Component({
                size : new mf.Param('100%', '100%')
            });
            this.addChild(cnt_ara);
            this.target(cnt_ara.target());
            
            this.select(0);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    index (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                let idx_frm = this.getChild(true)[0].getChild(true)[0].child();
                let ret = new Array();
                for (let fidx in idx_frm) {
                    ret.push(idx_frm[fidx].child()[0]);
                }
                ret.pop();
                return ret;
            }
            /* setter */
            if (true !== Array.isArray(prm)) {
                throw new Error('invalid parameter');
            }
            for (let pidx in prm) {
                this.addIndex(prm[pidx]);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    addIndex (prm) {
        try {
            let set_idx = null;
            /* check parameter */
            if ('string' === typeof prm) {
                set_idx = new Text(prm);
            }
            if (true !== mf.func.isInclude(set_idx, 'Text')) {
                throw new Error('invalid parameter');
            }
            /* add index */
            set_idx.style({
                'margin-left'   : '50px',
                'margin-right'  : '50px'
            });
            set_idx.addEffect(new efCenter(false,true));
            
            let frame = this.indexFrame();
            frame.addChild(set_idx);
            
            let idx_ara = this.getChild(true)[0].getChild(true)[0];
            idx_ara.addChild(
                frame,
                idx_ara.child().length-1
            );
            
            
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    indexFrame () {
        try {
            return new Frame({
                size     : new mf.Param(null, 45),
                addEvent : new Click(
                    (frm, tab) => {
                        try {
                            let tab_idx = tab.index();
                            for (let tidx in tab_idx) {
                                if (frm.getId() === tab_idx[tidx].parent().getId()) {
                                    tab.select(parseInt(tidx));
                                }
                            }
                        } catch (e) {
                            console.error(e.stack);
                            throw e;
                        }
                    },
                    this
                )
            });
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    select (prm) {
        try {
            if (undefined === prm) {
                return (undefined === this.m_selidx) ? null : this.m_selidx;
            }
            /* setter */
            if ('number' !== typeof prm) {
                throw new Error('invalid parameter');
            }
            let tab_idx = this.index();
            for (let tidx in tab_idx) {
                tab_idx[tidx].parent().style({
                    'border-bottom-width' : (tidx == prm) ? '0px' : '1px',
                    'background'          : (tidx == prm) ? 'rgb(255,255,255)' : 'rgb(240,240,240)'
                });
            }
            
            this.m_selidx = prm;
            
            let selevt = this.selectEvent();
            if (null !== selevt) {
                for (let sidx in selevt) {
                    selevt[sidx][0](this, selevt[sidx][1]);
                }
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    selectEvent (fnc, prm) {
        try {
            if (undefined === fnc) {
                /* getter */
                return (undefined === this.m_selevt) ? null : this.m_selevt;
            }
            /* setter */
            if ('function' !== typeof fnc) {
                throw new Error('invalid parameter');
            }
            if (undefined === this.m_selevt) {
                this.m_selevt = new Array();
            }
            this.m_selevt.push([fnc, prm]);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
module.exports = mf.comp.Tab;
/* end of file */
