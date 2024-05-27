import React from 'react';
import { Button } from '../Button';

export default {
  title: 'Button',
  component: Button,
};

export const Default = () => <Button value="7" onClick={() => {}} />;
export const Operation = () => <Button value="+" onClick={() => {}} className="operation" />;
export const Equal = () => <Button value="=" onClick={() => {}} className="equal" />;
export const Zero = () => <Button value="0" onClick={() => {}} />;
export const Decimal = () => <Button value="." onClick={() => {}} />;
export const Negative = () => <Button value="+/-" onClick={() => {}} className="operation" />;