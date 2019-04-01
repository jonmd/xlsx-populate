"use strict";

const proxyquire = require("proxyquire");

describe("dateConverter", () => {
    let dateConverter;

    beforeEach(() => {
        dateConverter = proxyquire("../../lib/dateConverter", {
            '@noCallThru': true
        });
    });

    describe("dateToNumber", () => {
        it("should convert date to number", () => {
            expect(dateConverter.dateToNumber(new Date('01 Jan 1900 00:00:00'))).toBe(1);
            expect(dateConverter.dateToNumber(new Date('28 Feb 1900 00:00:00'))).toBe(59);
            expect(dateConverter.dateToNumber(new Date('01 Mar 1900 00:00:00'))).toBe(61);
            expect(dateConverter.dateToNumber(new Date('07 Mar 2015 13:26:24'))).toBe(42070.56);
            expect(dateConverter.dateToNumber(new Date('04 Apr 2017 20:00:00'))).toBeCloseTo(42829.8333333333, 10);
        });

        // TODO This test only works in time zones with DST change on last Sunday in March
        // and have a base offset of +00:00 to +:10:00.
        it("should convert dates with correct hour where DST changes occur", () => {
            // Last Sunday in March 2019: standard time -> DST
            expect(dateConverter.dateToNumber(new Date('31 Mar 2019 12:00:00'))).toBe(43555.5);
            // Last Sunday in October 2018: DST -> standard time
            expect(dateConverter.dateToNumber(new Date('28 Oct 2018 12:00:00'))).toBe(43401.5);
        });
    });

    describe("numberToDate", () => {
        it("should convert number to date", () => {
            expect(dateConverter.numberToDate(1)).toEqual(new Date('01 Jan 1900 00:00:00'));
            expect(dateConverter.numberToDate(59)).toEqual(new Date('28 Feb 1900 00:00:00'));
            expect(dateConverter.numberToDate(61)).toEqual(new Date('01 Mar 1900 00:00:00'));
            expect(dateConverter.numberToDate(42070.56)).toEqual(new Date('07 Mar 2015 13:26:24'));
            expect(dateConverter.numberToDate(42829.8333333333)).toEqual(new Date('04 Apr 2017 20:00:00'));
        });

        // TODO This test only works in time zones with DST change on last Sunday in March
        // and have a base offset of +00:00 to +:10:00.
        it("should convert number to date with correct hour where DST changes occurs", () => {
            // Last Sunday in March 2019: standard time -> DST
            expect(dateConverter.numberToDate(43555.5)).toEqual(new Date('31 Mar 2019 12:00:00'));
            // Last Sunday in October 2018: DST -> standard time
            expect(dateConverter.numberToDate(43401.5)).toEqual(new Date('28 Oct 2018 12:00:00'));
        });
    });
});
